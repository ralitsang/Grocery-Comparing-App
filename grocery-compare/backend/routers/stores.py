"""
API router: stores and categories.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from backend.database import get_db
from backend import models, schemas

router = APIRouter(tags=["stores"])

stores_router = APIRouter(prefix="/api/stores")
categories_router = APIRouter(prefix="/api/categories")


@stores_router.get("", response_model=List[schemas.StoreOut])
def list_stores(db: Session = Depends(get_db)):
    return db.query(models.Store).all()


@categories_router.get("", response_model=List[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()


router.include_router(stores_router)
router.include_router(categories_router)
