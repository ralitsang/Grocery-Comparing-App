"""
API router: products & search.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from typing import List, Optional
from backend.database import get_db
from backend import models, schemas

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("", response_model=List[schemas.ProductOut])
def list_products(
    q: Optional[str] = Query(None, description="Search query"),
    category_id: Optional[int] = None,
    store_slug: Optional[str] = None,
    on_sale: bool = False,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """List / search products with active prices."""
    query = (
        db.query(models.Product)
        .options(
            joinedload(models.Product.prices).joinedload(models.Price.store),
            joinedload(models.Product.category),
        )
    )

    if q:
        term = f"%{q.lower()}%"
        query = query.filter(
            or_(
                models.Product.normalized_name.like(term),
                models.Product.brand.like(term),
            )
        )

    if category_id:
        query = query.filter(models.Product.category_id == category_id)

    # Build a single join on Price (+ Store if needed) to avoid joining the
    # same table twice when both store_slug and on_sale are active.
    if store_slug or on_sale:
        price_conditions = [models.Price.is_active == True]
        if on_sale:
            price_conditions.append(models.Price.discount_pct.isnot(None))

        query = query.join(models.Price).filter(*price_conditions)

        if store_slug:
            query = query.join(models.Store).filter(models.Store.slug == store_slug)

    products = query.offset(skip).limit(limit).all()

    # Filter nested prices to active only
    for p in products:
        p.prices = [pr for pr in p.prices if pr.is_active]

    return products


@router.get("/{product_id}", response_model=schemas.ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    from fastapi import HTTPException, status
    product = (
        db.query(models.Product)
        .options(
            joinedload(models.Product.prices).joinedload(models.Price.store),
            joinedload(models.Product.category),
        )
        .filter(models.Product.id == product_id)
        .first()
    )
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    product.prices = [pr for pr in product.prices if pr.is_active]
    return product
