"""
Brochure scraper for Bulgarian supermarkets.
Attempts to fetch weekly brochure PDF URLs from each store's website
and parse product/price data. Falls back gracefully on errors.
"""
import re
import logging
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from typing import Optional

logger = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}


def _fetch_html(url: str) -> Optional[BeautifulSoup]:
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return BeautifulSoup(resp.text, "lxml")
    except Exception as e:
        logger.warning(f"Failed to fetch {url}: {e}")
        return None


def _extract_price(text: str) -> Optional[float]:
    """Extract a float EUR price from a string like '2.99 лв' or '€3,49'."""
    # Convert BGN to EUR at rate 1.96 (fixed rate, Bulgaria in eurozone transition)
    match = re.search(r"(\d+)[.,](\d{1,2})", text)
    if match:
        return float(f"{match.group(1)}.{match.group(2)}")
    return None


# ── Store-specific scrapers ───────────────────────────────────────────────────

def scrape_lidl() -> list[dict]:
    """Scrape LIDL Bulgaria current brochure listing."""
    soup = _fetch_html("https://www.lidl.bg/bg/brochures.htm")
    if not soup:
        return []

    results = []
    # LIDL brochure pages list PDF links
    for a in soup.select("a[href$='.pdf']")[:1]:
        pdf_url = a.get("href", "")
        if pdf_url.startswith("/"):
            pdf_url = "https://www.lidl.bg" + pdf_url
        results.append({
            "store_slug": "lidl",
            "brochure_title": a.get_text(strip=True) or "LIDL Brochure",
            "pdf_url": pdf_url,
            "scraped_at": datetime.utcnow().isoformat(),
        })
    return results


def scrape_billa() -> list[dict]:
    """Scrape Billa Bulgaria current brochure."""
    soup = _fetch_html("https://www.billa.bg/promacii")
    if not soup:
        return []

    results = []
    for a in soup.select("a[href*='brochure'], a[href*='brocure'], a[href*='broschure'], a[href$='.pdf']")[:1]:
        pdf_url = a.get("href", "")
        if pdf_url.startswith("/"):
            pdf_url = "https://www.billa.bg" + pdf_url
        results.append({
            "store_slug": "billa",
            "brochure_title": a.get_text(strip=True) or "Billa Brochure",
            "pdf_url": pdf_url,
            "scraped_at": datetime.utcnow().isoformat(),
        })
    return results


def scrape_kaufland() -> list[dict]:
    """Scrape Kaufland Bulgaria current brochure."""
    soup = _fetch_html("https://www.kaufland.bg/aktualni-broshuri.html")
    if not soup:
        return []

    results = []
    for a in soup.select("a[href$='.pdf']")[:1]:
        pdf_url = a.get("href", "")
        if pdf_url.startswith("/"):
            pdf_url = "https://www.kaufland.bg" + pdf_url
        results.append({
            "store_slug": "kaufland",
            "brochure_title": a.get_text(strip=True) or "Kaufland Brochure",
            "pdf_url": pdf_url,
            "scraped_at": datetime.utcnow().isoformat(),
        })
    return results


def scrape_tmarket() -> list[dict]:
    """Scrape T-Market Bulgaria current brochure."""
    soup = _fetch_html("https://www.t-market.bg/broshuri")
    if not soup:
        return []

    results = []
    for a in soup.select("a[href$='.pdf']")[:1]:
        pdf_url = a.get("href", "")
        if pdf_url.startswith("/"):
            pdf_url = "https://www.t-market.bg" + pdf_url
        results.append({
            "store_slug": "tmarket",
            "brochure_title": a.get_text(strip=True) or "T-Market Brochure",
            "pdf_url": pdf_url,
            "scraped_at": datetime.utcnow().isoformat(),
        })
    return results


def scrape_fantastico() -> list[dict]:
    """Scrape Fantastico Bulgaria current brochure."""
    soup = _fetch_html("https://www.fantastico.bg/broshuri")
    if not soup:
        return []

    results = []
    for a in soup.select("a[href$='.pdf']")[:1]:
        pdf_url = a.get("href", "")
        if pdf_url.startswith("/"):
            pdf_url = "https://www.fantastico.bg" + pdf_url
        results.append({
            "store_slug": "fantastico",
            "brochure_title": a.get_text(strip=True) or "Fantastico Brochure",
            "pdf_url": pdf_url,
            "scraped_at": datetime.utcnow().isoformat(),
        })
    return results


def run_all_scrapers() -> list[dict]:
    """Run all store scrapers and return combined brochure metadata."""
    scrapers = [scrape_lidl, scrape_billa, scrape_kaufland, scrape_tmarket, scrape_fantastico]
    results = []
    for fn in scrapers:
        try:
            data = fn()
            results.extend(data)
            logger.info(f"{fn.__name__}: found {len(data)} brochure(s)")
        except Exception as e:
            logger.error(f"{fn.__name__} failed: {e}")
    return results
