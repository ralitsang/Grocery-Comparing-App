#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# GroceryCompare BG — start script
# Usage: ./start.sh
# ─────────────────────────────────────────────────────────────────────────────
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PYTHON="${PYTHON:-python3}"
UVICORN="$HOME/Library/Python/3.9/bin/uvicorn"

echo "🌱  Seeding database…"
$PYTHON -m backend.seed

echo ""
echo "🚀  Starting GroceryCompare BG at http://localhost:8000"
echo "   Press Ctrl+C to stop."
echo ""

$UVICORN main:app --host 0.0.0.0 --port 8000 --reload
