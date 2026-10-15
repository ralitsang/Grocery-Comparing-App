"""
SQLAlchemy ORM models for the grocery comparison app.
"""
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.database import Base


class Store(Base):
    __tablename__ = "stores"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)        # e.g. "Lidl"
    slug = Column(String, unique=True, nullable=False)        # e.g. "lidl"
    logo_url = Column(String, nullable=True)
    website = Column(String, nullable=True)
    color = Column(String, default="#333333")                 # brand hex colour
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    prices = relationship("Price", back_populates="store")
    brochures = relationship("Brochure", back_populates="store")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    icon = Column(String, default="🛒")

    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    normalized_name = Column(String, nullable=False, index=True)  # lowercase, stripped
    brand = Column(String, nullable=True)
    unit = Column(String, nullable=True)           # e.g. "1kg", "500ml"
    image_url = Column(String, nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    category = relationship("Category", back_populates="products")
    prices = relationship("Price", back_populates="product")


class Price(Base):
    __tablename__ = "prices"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    store_id = Column(Integer, ForeignKey("stores.id"), nullable=False)
    brochure_id = Column(Integer, ForeignKey("brochures.id"), nullable=True)
    price_eur = Column(Float, nullable=False)
    original_price_eur = Column(Float, nullable=True)   # before discount
    discount_pct = Column(Float, nullable=True)          # e.g. 20 for 20% off
    valid_from = Column(DateTime(timezone=True), nullable=True)
    valid_to = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    product = relationship("Product", back_populates="prices")
    store = relationship("Store", back_populates="prices")
    brochure = relationship("Brochure", back_populates="prices")


class Brochure(Base):
    __tablename__ = "brochures"

    id = Column(Integer, primary_key=True, index=True)
    store_id = Column(Integer, ForeignKey("stores.id"), nullable=False)
    title = Column(String, nullable=True)
    pdf_url = Column(String, nullable=True)
    valid_from = Column(DateTime(timezone=True), nullable=True)
    valid_to = Column(DateTime(timezone=True), nullable=True)
    scraped_at = Column(DateTime(timezone=True), server_default=func.now())

    store = relationship("Store", back_populates="brochures")
    prices = relationship("Price", back_populates="brochure")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    shopping_lists = relationship("ShoppingList", back_populates="user")
    favourites = relationship("Favourite", back_populates="user")
    alerts = relationship("PriceAlert", back_populates="user")


class ShoppingList(Base):
    __tablename__ = "shopping_lists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, default="My List")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="shopping_lists")
    items = relationship("ShoppingListItem", back_populates="shopping_list", cascade="all, delete-orphan")


class ShoppingListItem(Base):
    __tablename__ = "shopping_list_items"

    id = Column(Integer, primary_key=True, index=True)
    shopping_list_id = Column(Integer, ForeignKey("shopping_lists.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, default=1)

    shopping_list = relationship("ShoppingList", back_populates="items")
    product = relationship("Product")


class Favourite(Base):
    __tablename__ = "favourites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="favourites")
    product = relationship("Product")


class PriceAlert(Base):
    __tablename__ = "price_alerts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    target_price_eur = Column(Float, nullable=False)
    is_triggered = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="alerts")
    product = relationship("Product")
