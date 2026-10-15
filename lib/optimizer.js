// Basket Optimization & Comparison Engine
// All calculations in EUR (€)

import { STORES as MODULE_STORES, PRODUCTS as MODULE_PRODUCTS } from '../data/stores.js';

function getStores() {
  if (typeof window !== 'undefined' && window.AppCatalog && window.AppCatalog.STORES) {
    return window.AppCatalog.STORES;
  }
  return MODULE_STORES || [];
}

function getProducts() {
  if (typeof window !== 'undefined' && window.AppCatalog && window.AppCatalog.PRODUCTS) {
    return window.AppCatalog.PRODUCTS;
  }
  return MODULE_PRODUCTS || [];
}

/**
 * Calculates the real-world checkout spend and item details for a specific store
 */
export function calculateStoreBasket(basketItems, storeId) {
  const products = getProducts();
  let totalSpendEUR = 0;
  let totalPromoSavingsEUR = 0;
  const itemsBreakdown = [];

  for (const item of basketItems) {
    const product = products.find(p => p.id === item.productId);
    if (!product) continue;

    const storePrice = product.prices[storeId];
    if (!storePrice) {
      itemsBreakdown.push({
        productId: product.id,
        productName: product.name,
        isMissing: true,
        spendEUR: 0,
        packsNeeded: 0,
        unitPriceEUR: 0,
        brand: 'Не е налично',
        isPromo: false
      });
      continue;
    }

    const requestedQty = Number(item.qty);
    const packQty = Number(storePrice.packQty);
    // Real-world packaging rounding: you must purchase full packages
    const packsNeeded = Math.max(1, Math.ceil(requestedQty / packQty));
    const spendEUR = Number((packsNeeded * storePrice.priceEUR).toFixed(2));
    const unitPriceEUR = Number((storePrice.priceEUR / packQty).toFixed(2));

    let promoSavingsEUR = 0;
    if (storePrice.isPromo) {
      const estimatedRegular = storePrice.priceEUR / 0.85;
      promoSavingsEUR = Number((packsNeeded * (estimatedRegular - storePrice.priceEUR)).toFixed(2));
      totalPromoSavingsEUR += promoSavingsEUR;
    }

    totalSpendEUR += spendEUR;

    itemsBreakdown.push({
      productId: product.id,
      productName: product.name,
      category: product.category,
      unit: product.unit,
      requestedQty,
      packsNeeded,
      packQty,
      packUnit: storePrice.packUnit,
      pricePerPackEUR: storePrice.priceEUR,
      spendEUR,
      unitPriceEUR,
      brand: storePrice.brand,
      isPromo: storePrice.isPromo,
      promoNote: storePrice.promoNote,
      promoSavingsEUR,
      isBDS: product.isBDS
    });
  }

  return {
    storeId,
    totalSpendEUR: Number(totalSpendEUR.toFixed(2)),
    totalPromoSavingsEUR: Number(totalPromoSavingsEUR.toFixed(2)),
    itemsCount: itemsBreakdown.length,
    itemsBreakdown
  };
}

/**
 * Evaluates all stores and ranks them by lowest total checkout spend
 */
export function rankAllStores(basketItems) {
  const stores = getStores();
  if (!basketItems || basketItems.length === 0) {
    return {
      storeRankings: [],
      winner: null,
      averageSpendEUR: 0,
      maxSpendEUR: 0,
      minSpendEUR: 0,
      maxSavingsEUR: 0
    };
  }

  const storeRankings = stores.map(store => {
    const basketResult = calculateStoreBasket(basketItems, store.id);
    return {
      ...store,
      ...basketResult
    };
  });

  // Sort by lowest spend ascending
  storeRankings.sort((a, b) => a.totalSpendEUR - b.totalSpendEUR);

  const totalSum = storeRankings.reduce((acc, s) => acc + s.totalSpendEUR, 0);
  const averageSpendEUR = Number((totalSum / storeRankings.length).toFixed(2));
  const winner = storeRankings[0];
  const mostExpensive = storeRankings[storeRankings.length - 1];
  const maxSavingsEUR = Number((mostExpensive.totalSpendEUR - winner.totalSpendEUR).toFixed(2));

  return {
    storeRankings,
    winner,
    mostExpensive,
    averageSpendEUR,
    maxSavingsEUR
  };
}

/**
 * Computes the optimal 2-store split basket
 * Recommends splitting only if net savings exceed thresholdEUR (default €3.00)
 */
export function calculateSplitBasket(basketItems, singleStoreWinner, thresholdEUR = 3.0) {
  const stores = getStores();
  const products = getProducts();

  if (!basketItems || basketItems.length < 2 || !singleStoreWinner) {
    return null;
  }

  let bestSplit = null;
  let maxSavingsEUR = 0;

  for (let i = 0; i < stores.length; i++) {
    for (let j = i + 1; j < stores.length; j++) {
      const storeA = stores[i];
      const storeB = stores[j];

      let splitSpendEUR = 0;
      const storeAItems = [];
      const storeBItems = [];

      for (const item of basketItems) {
        const product = products.find(p => p.id === item.productId);
        if (!product) continue;

        const priceA = product.prices[storeA.id];
        const priceB = product.prices[storeB.id];

        const reqQty = Number(item.qty);
        const packsA = Math.max(1, Math.ceil(reqQty / (priceA ? priceA.packQty : 1)));
        const spendA = priceA ? Number((packsA * priceA.priceEUR).toFixed(2)) : Infinity;

        const packsB = Math.max(1, Math.ceil(reqQty / (priceB ? priceB.packQty : 1)));
        const spendB = priceB ? Number((packsB * priceB.priceEUR).toFixed(2)) : Infinity;

        if (spendA <= spendB) {
          splitSpendEUR += spendA;
          storeAItems.push({
            productName: product.name,
            brand: priceA.brand,
            packsNeeded: packsA,
            spendEUR: spendA,
            isPromo: priceA.isPromo
          });
        } else {
          splitSpendEUR += spendB;
          storeBItems.push({
            productName: product.name,
            brand: priceB.brand,
            packsNeeded: packsB,
            spendEUR: spendB,
            isPromo: priceB.isPromo
          });
        }
      }

      if (storeAItems.length > 0 && storeBItems.length > 0) {
        splitSpendEUR = Number(splitSpendEUR.toFixed(2));
        const savingsEUR = Number((singleStoreWinner.totalSpendEUR - splitSpendEUR).toFixed(2));

        if (savingsEUR > maxSavingsEUR) {
          maxSavingsEUR = savingsEUR;
          bestSplit = {
            storeA,
            storeB,
            storeAItems,
            storeBItems,
            splitSpendEUR,
            singleWinnerSpendEUR: singleStoreWinner.totalSpendEUR,
            savingsEUR,
            isRecommended: savingsEUR >= thresholdEUR,
            thresholdEUR
          };
        }
      }
    }
  }

  return bestSplit;
}

// Universal browser & module support
if (typeof window !== 'undefined') {
  window.AppOptimizer = { calculateStoreBasket, rankAllStores, calculateSplitBasket };
}
