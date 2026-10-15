#!/usr/bin/env bash

# Start local server for Кошница.bg
PORT=3000
echo "=========================================================="
echo "🛒 Стартиране на Кошница.bg (Сравнение на супермаркети)"
echo "📍 Локален адрес: http://localhost:$PORT"
echo "🇪🇺 Всички цени са в EUR (€)"
echo "=========================================================="

# Open browser on macOS
if command -v open >/dev/null 2>&1; then
  (sleep 1 && open "http://localhost:$PORT") &
fi

# Run built-in macOS ruby web server
exec ruby -run -e httpd . -p "$PORT"
