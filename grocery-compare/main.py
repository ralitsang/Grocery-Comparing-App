"""
FastAPI application entry point.
"""
import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from backend.database import engine
from backend import models
from backend.routers import products, auth, lists, user, stores

# Create all tables on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GroceryCompare BG",
    description="Compare grocery prices across Bulgarian supermarkets",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── API routers ───────────────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(lists.router)
app.include_router(user.router)
app.include_router(stores.router)


# ── Static files & SPA fallback ───────────────────────────────────────────────
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "frontend")
STATIC_DIR = os.path.join(FRONTEND_DIR, "static")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/{full_path:path}", include_in_schema=False)
def spa_fallback(full_path: str):
    """Serve the SPA index for all non-API routes."""
    index = os.path.join(FRONTEND_DIR, "index.html")
    return FileResponse(index)


@app.get("/", include_in_schema=False)
def root():
    index = os.path.join(FRONTEND_DIR, "index.html")
    return FileResponse(index)
