"""
Seed the database with stores and categories, and insert demo product data
so the app is usable immediately without needing a live scrape.
"""
import os
import sys
import re
from datetime import datetime, timedelta

# Allow running as `python3 -m backend.seed` from grocery-compare/
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from backend.database import SessionLocal, engine
from backend import models

models.Base.metadata.create_all(bind=engine)


STORES = [
    {
        "name": "Billa",
        "slug": "billa",
        "logo_url": "/static/images/billa.png",
        "website": "https://www.billa.bg",
        "color": "#e30613",
    },
    {
        "name": "LIDL",
        "slug": "lidl",
        "logo_url": "/static/images/lidl.png",
        "website": "https://www.lidl.bg",
        "color": "#0050aa",
    },
    {
        "name": "Kaufland",
        "slug": "kaufland",
        "logo_url": "/static/images/kaufland.png",
        "website": "https://www.kaufland.bg",
        "color": "#e3000f",
    },
    {
        "name": "T-Market",
        "slug": "tmarket",
        "logo_url": "/static/images/tmarket.png",
        "website": "https://www.t-market.bg",
        "color": "#f47920",
    },
    {
        "name": "Fantastico",
        "slug": "fantastico",
        "logo_url": "/static/images/fantastico.png",
        "website": "https://www.fantastico.bg",
        "color": "#1a5276",
    },
]

CATEGORIES = [
    {"name": "Dairy & Eggs", "icon": "🥛"},
    {"name": "Meat & Fish", "icon": "🥩"},
    {"name": "Fruits & Vegetables", "icon": "🥦"},
    {"name": "Bakery", "icon": "🍞"},
    {"name": "Beverages", "icon": "🥤"},
    {"name": "Snacks & Sweets", "icon": "🍫"},
    {"name": "Pantry", "icon": "🫙"},
    {"name": "Frozen Foods", "icon": "❄️"},
    {"name": "Household", "icon": "🧹"},
    {"name": "Personal Care", "icon": "🧴"},
]

# Demo products: (name, brand, unit, category_name, emoji_img_placeholder,
#                [(store_slug, price_eur, orig_price_eur, discount_pct)])
DEMO_PRODUCTS = [
    ("Milk 3.5%", "Mlekus", "1L", "Dairy & Eggs", "🥛", [
        ("billa", 1.29, 1.59, 19),
        ("lidl", 1.29, 1.59, 19),
        ("kaufland", 1.35, 1.65, 18),
        ("tmarket", 1.45, None, None),
        ("fantastico", 1.42, None, None),
    ]),
    ("White Bread", "Dobrudja", "700g", "Bakery", "🍞", [
        ("billa", 1.09, None, None),
        ("lidl", 0.99, None, None),
        ("kaufland", 0.95, 1.15, 17),
        ("tmarket", 1.19, 1.39, 14),
        ("fantastico", 1.15, None, None),
    ]),
    ("Chicken Breast", "Gradus", "1kg", "Meat & Fish", "🍗", [
        ("billa", 8.99, 10.99, 18),
        ("lidl", 8.49, None, None),
        ("kaufland", 8.79, 10.49, 16),
        ("tmarket", 8.79, None, None),
        ("fantastico", 8.99, 10.99, 18),
    ]),
    ("Eggs Free Range", "BioFarm", "10 pcs", "Dairy & Eggs", "🥚", [
        ("billa", 3.49, None, None),
        ("lidl", 3.29, 3.99, 18),
        ("kaufland", 3.39, 3.99, 15),
        ("tmarket", 3.79, None, None),
        ("fantastico", 3.29, 3.99, 18),
    ]),
    ("Greek Yogurt", "Danone", "400g", "Dairy & Eggs", "🍶", [
        ("billa", 1.99, None, None),
        ("lidl", 1.79, 2.19, 18),
        ("kaufland", 1.69, 1.99, 15),
        ("tmarket", 2.09, None, None),
        ("fantastico", 1.85, 2.19, 16),
    ]),
    ("Tomatoes", None, "1kg", "Fruits & Vegetables", "🍅", [
        ("billa", 2.49, None, None),
        ("lidl", 1.99, None, None),
        ("kaufland", 1.89, 2.29, 17),
        ("tmarket", 2.19, None, None),
        ("fantastico", 1.99, 2.39, 17),
    ]),
    ("Bananas", None, "1kg", "Fruits & Vegetables", "🍌", [
        ("billa", 1.49, 1.79, 17),
        ("lidl", 1.49, None, None),
        ("kaufland", 1.39, 1.59, 13),
        ("tmarket", 1.79, None, None),
        ("fantastico", 1.59, 1.79, 11),
    ]),
    ("Orange Juice", "Cappy", "1L", "Beverages", "🍊", [
        ("billa", 2.99, None, None),
        ("lidl", 2.49, 2.99, 17),
        ("kaufland", 2.59, 2.99, 13),
        ("tmarket", 3.09, None, None),
        ("fantastico", 2.69, 2.99, 10),
    ]),
    ("Mineral Water", "Devin", "1.5L", "Beverages", "💧", [
        ("billa", 0.69, 0.89, 22),
        ("lidl", 0.69, None, None),
        ("kaufland", 0.59, 0.79, 25),
        ("tmarket", 0.99, None, None),
        ("fantastico", 0.75, 0.89, 16),
    ]),
    ("Pasta Spaghetti", "Barilla", "500g", "Pantry", "🍝", [
        ("billa", 2.19, None, None),
        ("lidl", 1.79, 2.29, 22),
        ("kaufland", 1.89, 2.29, 17),
        ("tmarket", 2.29, None, None),
        ("fantastico", 1.99, 2.29, 13),
    ]),
    ("Sunflower Oil", "Slivo", "1L", "Pantry", "🫙", [
        ("billa", 2.29, 2.79, 18),
        ("lidl", 2.29, None, None),
        ("kaufland", 2.19, 2.59, 15),
        ("tmarket", 2.69, None, None),
        ("fantastico", 2.39, 2.69, 11),
    ]),
    ("Cheese Kashkaval", "Vache Qui Rit", "200g", "Dairy & Eggs", "🧀", [
        ("billa", 3.99, None, None),
        ("lidl", 3.49, 3.99, 13),
        ("kaufland", 3.49, 3.99, 13),
        ("tmarket", 4.19, None, None),
        ("fantastico", 3.59, 3.99, 10),
    ]),
    ("Chocolate Bar", "Milka", "100g", "Snacks & Sweets", "🍫", [
        ("billa", 1.29, 1.59, 19),
        ("lidl", 1.29, None, None),
        ("kaufland", 1.19, 1.49, 20),
        ("tmarket", 1.59, None, None),
        ("fantastico", 1.25, 1.49, 16),
    ]),
    ("Salmon Fillet", "Norgesgruppen", "300g", "Meat & Fish", "🐟", [
        ("billa", 9.99, 11.99, 17),
        ("lidl", 8.99, None, None),
        ("kaufland", 9.49, 11.49, 17),
        ("tmarket", 10.99, None, None),
        ("fantastico", 9.29, 10.99, 15),
    ]),
    ("Dishwashing Liquid", "Fairy", "500ml", "Household", "🧹", [
        ("billa", 3.29, None, None),
        ("lidl", 2.79, 3.29, 15),
        ("kaufland", 2.69, 3.29, 18),
        ("tmarket", 3.49, None, None),
        ("fantastico", 2.89, 3.29, 12),
    ]),
    ("Shampoo", "Pantene", "400ml", "Personal Care", "🧴", [
        ("billa", 5.99, None, None),
        ("lidl", 4.99, 5.99, 17),
        ("kaufland", 4.79, 5.99, 20),
        ("tmarket", 6.29, None, None),
        ("fantastico", 5.19, 5.99, 13),
    ]),
    ("Frozen Pizza", "Dr. Oetker", "350g", "Frozen Foods", "🍕", [
        ("billa", 4.99, None, None),
        ("lidl", 3.99, 4.99, 20),
        ("kaufland", 3.89, 4.99, 22),
        ("tmarket", 5.29, None, None),
        ("fantastico", 4.29, 4.99, 14),
    ]),
    ("Apple Red", None, "1kg", "Fruits & Vegetables", "🍎", [
        ("billa", 1.79, 1.99, 10),
        ("lidl", 1.79, None, None),
        ("kaufland", 1.69, 1.99, 15),
        ("tmarket", 2.09, None, None),
        ("fantastico", 1.75, 1.99, 12),
    ]),
    ("Coffee Beans", "Lavazza", "250g", "Beverages", "☕", [
        ("billa", 7.99, None, None),
        ("lidl", 6.99, 7.99, 13),
        ("kaufland", 6.79, 7.99, 15),
        ("tmarket", 8.49, None, None),
        ("fantastico", 7.19, 7.99, 10),
    ]),
    ("Butter", "President", "200g", "Dairy & Eggs", "🧈", [
        ("billa", 3.49, None, None),
        ("lidl", 2.99, 3.49, 14),
        ("kaufland", 2.89, 3.49, 17),
        ("tmarket", 3.69, None, None),
        ("fantastico", 3.09, 3.49, 11),
    ]),
]


def normalize(name: str) -> str:
    return re.sub(r"\s+", " ", name.strip().lower())


def seed():
    db = SessionLocal()
    try:
        # Stores
        store_map = {}
        for s in STORES:
            existing = db.query(models.Store).filter_by(slug=s["slug"]).first()
            if not existing:
                obj = models.Store(**s)
                db.add(obj)
                db.flush()
                store_map[s["slug"]] = obj
            else:
                store_map[s["slug"]] = existing

        # Categories
        cat_map = {}
        for c in CATEGORIES:
            existing = db.query(models.Category).filter_by(name=c["name"]).first()
            if not existing:
                obj = models.Category(**c)
                db.add(obj)
                db.flush()
                cat_map[c["name"]] = obj
            else:
                cat_map[c["name"]] = existing

        # Products + Prices
        now = datetime.utcnow()
        valid_to = now + timedelta(days=7)

        for (pname, brand, unit, cat_name, emoji, price_rows) in DEMO_PRODUCTS:
            norm = normalize(pname)
            product = db.query(models.Product).filter_by(normalized_name=norm).first()
            if not product:
                product = models.Product(
                    name=pname,
                    normalized_name=norm,
                    brand=brand,
                    unit=unit,
                    image_url=emoji,   # emoji used as placeholder
                    category_id=cat_map.get(cat_name, None) and cat_map[cat_name].id,
                )
                db.add(product)
                db.flush()

            for (slug, price, orig, disc) in price_rows:
                store = store_map[slug]
                existing_price = (
                    db.query(models.Price)
                    .filter_by(product_id=product.id, store_id=store.id, is_active=True)
                    .first()
                )
                if existing_price:
                    # Update in place so discount changes are picked up on re-seed
                    existing_price.price_eur = price
                    existing_price.original_price_eur = orig
                    existing_price.discount_pct = disc
                    existing_price.valid_from = now
                    existing_price.valid_to = valid_to
                else:
                    db.add(models.Price(
                        product_id=product.id,
                        store_id=store.id,
                        price_eur=price,
                        original_price_eur=orig,
                        discount_pct=disc,
                        valid_from=now,
                        valid_to=valid_to,
                        is_active=True,
                    ))

        db.commit()
        print("✅ Database seeded successfully.")
    except Exception as e:
        db.rollback()
        print(f"❌ Seed failed: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
