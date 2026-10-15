"""
Pydantic schemas for request/response validation.
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ── Store ────────────────────────────────────────────────────────────────────

class StoreBase(BaseModel):
    name: str
    slug: str
    logo_url: Optional[str] = None
    website: Optional[str] = None
    color: Optional[str] = "#333333"

class StoreOut(StoreBase):
    id: int
    class Config:
        from_attributes = True


# ── Category ─────────────────────────────────────────────────────────────────

class CategoryOut(BaseModel):
    id: int
    name: str
    icon: str
    class Config:
        from_attributes = True


# ── Price (nested) ───────────────────────────────────────────────────────────

class PriceOut(BaseModel):
    id: int
    store_id: int
    store: StoreOut
    price_eur: float
    original_price_eur: Optional[float] = None
    discount_pct: Optional[float] = None
    valid_from: Optional[datetime] = None
    valid_to: Optional[datetime] = None
    is_active: bool
    class Config:
        from_attributes = True


# ── Product ───────────────────────────────────────────────────────────────────

class ProductBase(BaseModel):
    name: str
    brand: Optional[str] = None
    unit: Optional[str] = None
    image_url: Optional[str] = None
    category_id: Optional[int] = None

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    category: Optional[CategoryOut] = None
    prices: List[PriceOut] = []
    class Config:
        from_attributes = True


# ── User / Auth ───────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

class UserOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None


# ── Shopping List ─────────────────────────────────────────────────────────────

class ShoppingListItemCreate(BaseModel):
    product_id: int
    quantity: int = 1

class ShoppingListItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    product: ProductOut
    class Config:
        from_attributes = True

class ShoppingListCreate(BaseModel):
    name: str = "My List"

class ShoppingListOut(BaseModel):
    id: int
    name: str
    created_at: datetime
    items: List[ShoppingListItemOut] = []
    class Config:
        from_attributes = True


# ── Basket comparison result ──────────────────────────────────────────────────

class BasketStoreTotal(BaseModel):
    store: StoreOut
    total_eur: float
    items_found: int
    items_missing: int

class BasketComparisonOut(BaseModel):
    totals: List[BasketStoreTotal]
    cheapest_store: Optional[StoreOut] = None


# ── Favourite ─────────────────────────────────────────────────────────────────

class FavouriteOut(BaseModel):
    id: int
    product_id: int
    product: ProductOut
    created_at: datetime
    class Config:
        from_attributes = True


# ── Price Alert ───────────────────────────────────────────────────────────────

class PriceAlertCreate(BaseModel):
    product_id: int
    target_price_eur: float

class PriceAlertOut(BaseModel):
    id: int
    product_id: int
    target_price_eur: float
    is_triggered: bool
    product: ProductOut
    created_at: datetime
    class Config:
        from_attributes = True
