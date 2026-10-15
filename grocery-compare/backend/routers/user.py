"""
API router: favourites and price alerts.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from backend.database import get_db
from backend import models, schemas
from backend.auth import get_current_user

router = APIRouter(tags=["user"])


# ── Favourites ────────────────────────────────────────────────────────────────

fav_router = APIRouter(prefix="/api/favourites")


@fav_router.get("", response_model=List[schemas.FavouriteOut])
def get_favourites(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(models.Favourite)
        .options(
            joinedload(models.Favourite.product)
            .joinedload(models.Product.prices)
            .joinedload(models.Price.store),
            joinedload(models.Favourite.product)
            .joinedload(models.Product.category),
        )
        .filter_by(user_id=current_user.id)
        .all()
    )


@fav_router.post("/{product_id}", response_model=schemas.FavouriteOut, status_code=201)
def add_favourite(
    product_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing = db.query(models.Favourite).filter_by(
        user_id=current_user.id, product_id=product_id
    ).first()
    if existing:
        return existing
    fav = models.Favourite(user_id=current_user.id, product_id=product_id)
    db.add(fav)
    db.commit()
    db.refresh(fav)
    return fav


@fav_router.delete("/{product_id}", status_code=204)
def remove_favourite(
    product_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    fav = db.query(models.Favourite).filter_by(
        user_id=current_user.id, product_id=product_id
    ).first()
    if not fav:
        raise HTTPException(status_code=404, detail="Favourite not found")
    db.delete(fav)
    db.commit()


# ── Price Alerts ──────────────────────────────────────────────────────────────

alert_router = APIRouter(prefix="/api/alerts")


@alert_router.get("", response_model=List[schemas.PriceAlertOut])
def get_alerts(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(models.PriceAlert)
        .options(
            joinedload(models.PriceAlert.product)
            .joinedload(models.Product.prices)
            .joinedload(models.Price.store),
        )
        .filter_by(user_id=current_user.id)
        .all()
    )


@alert_router.post("", response_model=schemas.PriceAlertOut, status_code=201)
def create_alert(
    alert_in: schemas.PriceAlertCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    alert = models.PriceAlert(
        user_id=current_user.id,
        product_id=alert_in.product_id,
        target_price_eur=alert_in.target_price_eur,
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert


@alert_router.delete("/{alert_id}", status_code=204)
def delete_alert(
    alert_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    alert = db.query(models.PriceAlert).filter_by(
        id=alert_id, user_id=current_user.id
    ).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    db.delete(alert)
    db.commit()


# Combine into single router for main.py import
router.include_router(fav_router)
router.include_router(alert_router)
