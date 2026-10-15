"""
API router: shopping lists and basket comparison.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List
from backend.database import get_db
from backend import models, schemas
from backend.auth import get_current_user

router = APIRouter(prefix="/api/lists", tags=["shopping-lists"])


def _get_list_or_404(list_id: int, user_id: int, db: Session) -> models.ShoppingList:
    sl = db.query(models.ShoppingList).filter_by(id=list_id, user_id=user_id).first()
    if not sl:
        raise HTTPException(status_code=404, detail="Shopping list not found")
    return sl


@router.get("", response_model=List[schemas.ShoppingListOut])
def get_lists(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(models.ShoppingList)
        .options(
            joinedload(models.ShoppingList.items)
            .joinedload(models.ShoppingListItem.product)
            .joinedload(models.Product.prices)
            .joinedload(models.Price.store),
            joinedload(models.ShoppingList.items)
            .joinedload(models.ShoppingListItem.product)
            .joinedload(models.Product.category),
        )
        .filter_by(user_id=current_user.id)
        .all()
    )


@router.post("", response_model=schemas.ShoppingListOut, status_code=201)
def create_list(
    list_in: schemas.ShoppingListCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    sl = models.ShoppingList(name=list_in.name, user_id=current_user.id)
    db.add(sl)
    db.commit()
    db.refresh(sl)
    return sl


@router.delete("/{list_id}", status_code=204)
def delete_list(
    list_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    sl = _get_list_or_404(list_id, current_user.id, db)
    db.delete(sl)
    db.commit()


@router.post("/{list_id}/items", response_model=schemas.ShoppingListOut)
def add_item(
    list_id: int,
    item_in: schemas.ShoppingListItemCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    sl = _get_list_or_404(list_id, current_user.id, db)
    # Update qty if already in list
    existing = next(
        (i for i in sl.items if i.product_id == item_in.product_id), None
    )
    if existing:
        existing.quantity += item_in.quantity
    else:
        db.add(models.ShoppingListItem(
            shopping_list_id=list_id,
            product_id=item_in.product_id,
            quantity=item_in.quantity,
        ))
    db.commit()
    db.refresh(sl)
    return sl


@router.delete("/{list_id}/items/{item_id}", status_code=204)
def remove_item(
    list_id: int,
    item_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    sl = _get_list_or_404(list_id, current_user.id, db)
    item = db.query(models.ShoppingListItem).filter_by(id=item_id, shopping_list_id=sl.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()


@router.get("/{list_id}/compare", response_model=schemas.BasketComparisonOut)
def compare_basket(
    list_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Return total basket cost at each store for the items in the list."""
    sl = _get_list_or_404(list_id, current_user.id, db)

    stores = db.query(models.Store).all()
    totals = []

    for store in stores:
        total = 0.0
        found = 0
        missing = 0
        for item in sl.items:
            price_row = (
                db.query(models.Price)
                .filter_by(product_id=item.product_id, store_id=store.id, is_active=True)
                .first()
            )
            if price_row:
                total += price_row.price_eur * item.quantity
                found += 1
            else:
                missing += 1
        totals.append(schemas.BasketStoreTotal(
            store=store,
            total_eur=round(total, 2),
            items_found=found,
            items_missing=missing,
        ))

    totals.sort(key=lambda x: (x.items_missing, x.total_eur))
    cheapest = totals[0].store if totals else None
    return schemas.BasketComparisonOut(totals=totals, cheapest_store=cheapest)
