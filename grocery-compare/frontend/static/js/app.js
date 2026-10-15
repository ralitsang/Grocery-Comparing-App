/* ── API client ──────────────────────────────────────────────────────────── */

const API = {
  base: '',

  _token() {
    return localStorage.getItem('gc_token');
  },

  async _req(method, path, body) {
    const headers = { 'Content-Type': 'application/json' };
    const token = this._token();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const opts = { method, headers };
    if (body !== undefined) opts.body = JSON.stringify(body);
    const res = await fetch(this.base + path, opts);
    if (res.status === 204) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
    return data;
  },

  get:    (path)       => API._req('GET',    path),
  post:   (path, body) => API._req('POST',   path, body),
  delete: (path)       => API._req('DELETE', path),

  async login(email, password) {
    const form = new URLSearchParams({ username: email, password });
    const res = await fetch(this.base + '/api/auth/token', {
      method: 'POST',
      body: form,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || 'Login failed');
    return data;
  },
};


/* ── Toast ───────────────────────────────────────────────────────────────── */

function toast(msg, type = '') {
  const c = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast${type ? ' ' + type : ''}`;
  el.textContent = msg;
  c.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}


/* ── State ───────────────────────────────────────────────────────────────── */

const state = {
  user: null,
  products: [],
  stores: [],
  categories: [],
  favouriteIds: new Set(),
  activeListId: null,
  lists: [],
  filters: { q: '', category: null, store: null, onSale: false },
};


/* ── Auth helpers ─────────────────────────────────────────────────────────── */

function setToken(token) {
  localStorage.setItem('gc_token', token);
}
function clearToken() {
  localStorage.removeItem('gc_token');
}

async function loadCurrentUser() {
  const token = localStorage.getItem('gc_token');
  if (!token) return;
  try {
    state.user = await API.get('/api/auth/me');
    renderAuthNav();
    await loadFavouriteIds();
  } catch {
    clearToken();
  }
}

async function loadFavouriteIds() {
  if (!state.user) return;
  try {
    const favs = await API.get('/api/favourites');
    state.favouriteIds = new Set(favs.map(f => f.product_id));
  } catch {}
}


/* ── Navigation ──────────────────────────────────────────────────────────── */

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const pageEl = document.getElementById(`page-${page}`);
  const tabEl  = document.querySelector(`.nav-tab[data-page="${page}"]`);
  if (pageEl) pageEl.classList.add('active');
  if (tabEl)  tabEl.classList.add('active');

  if (page === 'search')     loadProducts();
  if (page === 'deals')      loadDeals();
  if (page === 'list')       loadShoppingList();
  if (page === 'favourites') loadFavourites();
}

function renderAuthNav() {
  const nav = document.getElementById('auth-nav');
  if (state.user) {
    nav.innerHTML = `
      <span style="font-size:.82rem;color:var(--text-muted)">👋 ${state.user.full_name || state.user.email.split('@')[0]}</span>
      <button class="btn btn-ghost btn-sm" onclick="logout()">Sign out</button>
    `;
  } else {
    nav.innerHTML = `
      <button class="btn btn-ghost btn-sm" onclick="navigate('login')">Sign in</button>
      <button class="btn btn-primary btn-sm" onclick="navigate('register')">Register</button>
    `;
  }
}

function logout() {
  clearToken();
  state.user = null;
  state.favouriteIds = new Set();
  renderAuthNav();
  navigate('search');
  toast('Signed out');
}


/* ── Store badge colour helper ───────────────────────────────────────────── */

const STORE_COLORS = {
  billa: '#e30613',
  lidl: '#0050aa',
  kaufland: '#e3000f',
  tmarket: '#f47920',
  fantastico: '#1a5276',
};

function storeBadge(store) {
  const col = STORE_COLORS[store.slug] || store.color || '#888';
  return `<span class="store-badge" style="background:${col}">${store.name}</span>`;
}


/* ── Products / Search page ──────────────────────────────────────────────── */

async function loadProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = `<div class="loading-overlay" style="grid-column:1/-1">Loading… <span class="spinner"></span></div>`;

  try {
    const params = new URLSearchParams();
    if (state.filters.q)        params.set('q', state.filters.q);
    if (state.filters.category) params.set('category_id', state.filters.category);
    if (state.filters.store)    params.set('store_slug', state.filters.store);
    if (state.filters.onSale)   params.set('on_sale', 'true');

    state.products = await API.get(`/api/products?${params}`);
    renderProducts();
  } catch (e) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">⚠️</div><p>${e.message}</p></div>`;
  }
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!state.products.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><p>No products found. Try a different search.</p></div>`;
    return;
  }

  grid.innerHTML = state.products.map(p => {
    const prices = p.prices || [];
    const minPrice = prices.length ? Math.min(...prices.map(pr => pr.price_eur)) : null;
    const hasDeal = prices.some(pr => pr.discount_pct);
    const isFav = state.favouriteIds.has(p.id);

    const priceRows = prices
      .sort((a, b) => a.price_eur - b.price_eur)
      .slice(0, 3)
      .map((pr, i) => `
        <div class="price-row">
          ${storeBadge(pr.store)}
          <span class="price-val${i === 0 ? ' price-best' : ''}">€${pr.price_eur.toFixed(2)}</span>
          ${pr.original_price_eur ? `<span class="price-orig">€${pr.original_price_eur.toFixed(2)}</span>` : ''}
          ${pr.discount_pct ? `<span class="badge-discount">-${pr.discount_pct}%</span>` : ''}
        </div>
      `).join('');

    return `
      <div class="product-card" onclick="openProduct(${p.id})">
        <div class="product-img">${p.image_url || '🛒'}</div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-meta">${[p.brand, p.unit].filter(Boolean).join(' · ')}</div>
          ${priceRows}
          <div class="card-actions" onclick="event.stopPropagation()">
            <button class="btn btn-ghost btn-sm" onclick="toggleFavourite(${p.id}, this)">
              ${isFav ? '❤️' : '🤍'} ${isFav ? 'Saved' : 'Save'}
            </button>
            <button class="btn btn-primary btn-sm" onclick="addToList(${p.id})">
              + List
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

const debouncedSearch = debounce(() => loadProducts(), 350);

function setupSearchFilters() {
  document.getElementById('search-input').addEventListener('input', e => {
    state.filters.q = e.target.value.trim();
    debouncedSearch();
  });

  document.getElementById('chip-sale').addEventListener('click', function () {
    state.filters.onSale = !state.filters.onSale;
    this.classList.toggle('active', state.filters.onSale);
    loadProducts();
  });
}

function renderCategoryChips() {
  const row = document.getElementById('category-chips');
  row.innerHTML = `
    <button class="chip active" data-cat="" onclick="filterCategory(this, '')">All</button>
    ${state.categories.map(c => `
      <button class="chip" data-cat="${c.id}" onclick="filterCategory(this, ${c.id})">${c.icon} ${c.name}</button>
    `).join('')}
  `;
}

function filterCategory(el, id) {
  state.filters.category = id || null;
  document.querySelectorAll('#category-chips .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  loadProducts();
}

function renderStoreChips() {
  const row = document.getElementById('store-chips');
  row.innerHTML = `
    <button class="store-chip active" style="background:#555" data-slug="" onclick="filterStore(this, '')">All stores</button>
    ${state.stores.map(s => {
      const col = STORE_COLORS[s.slug] || s.color;
      return `<button class="store-chip" style="background:${col}" data-slug="${s.slug}" onclick="filterStore(this, '${s.slug}')">${s.name}</button>`;
    }).join('')}
  `;
}

function filterStore(el, slug) {
  state.filters.store = slug || null;
  document.querySelectorAll('#store-chips .store-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  loadProducts();
}


/* ── Product detail modal ────────────────────────────────────────────────── */

async function openProduct(id) {
  const overlay = document.getElementById('product-modal');
  overlay.classList.add('open');
  overlay.querySelector('.modal-body').innerHTML = `<div class="loading-overlay">Loading… <span class="spinner"></span></div>`;

  try {
    const p = await API.get(`/api/products/${id}`);
    const prices = (p.prices || []).sort((a, b) => a.price_eur - b.price_eur);
    const minPrice = prices[0]?.price_eur;

    overlay.querySelector('.modal-emoji').textContent = p.image_url || '🛒';
    overlay.querySelector('.modal-title').textContent = p.name;
    overlay.querySelector('.modal-sub').textContent = [p.brand, p.unit, p.category?.name].filter(Boolean).join(' · ');

    const rows = prices.map(pr => {
      const isCheap = pr.price_eur === minPrice;
      return `
        <tr class="${isCheap ? 'cheapest' : ''}">
          <td>${storeBadge(pr.store)}</td>
          <td><strong>€${pr.price_eur.toFixed(2)}</strong>
            ${isCheap ? '<span class="cheapest-label">Cheapest</span>' : ''}
          </td>
          <td>${pr.original_price_eur ? `<span class="price-orig">€${pr.original_price_eur.toFixed(2)}</span>` : '—'}</td>
          <td>${pr.discount_pct ? `<span class="badge-discount">-${pr.discount_pct}%</span>` : '—'}</td>
        </tr>
      `;
    }).join('');

    overlay.querySelector('.modal-body').innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th>Store</th><th>Price</th><th>Was</th><th>Save</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="display:flex;gap:.5rem;margin-top:1.25rem;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="addToList(${p.id});closeModal()">🧺 Add to List</button>
        <button class="btn btn-ghost" onclick="toggleFavourite(${p.id}, this)">
          ${state.favouriteIds.has(p.id) ? '❤️ Saved' : '🤍 Save'}
        </button>
        ${state.user ? `<button class="btn btn-ghost" onclick="openAlertDialog(${p.id}, '${p.name}')">🔔 Set Price Alert</button>` : ''}
      </div>
    `;
  } catch (e) {
    overlay.querySelector('.modal-body').innerHTML = `<p style="color:var(--danger)">Failed to load: ${e.message}</p>`;
  }
}

function closeModal() {
  document.getElementById('product-modal').classList.remove('open');
}


/* ── Favourites ──────────────────────────────────────────────────────────── */

async function toggleFavourite(productId, btn) {
  if (!state.user) { navigate('login'); toast('Sign in to save favourites'); return; }
  try {
    if (state.favouriteIds.has(productId)) {
      await API.delete(`/api/favourites/${productId}`);
      state.favouriteIds.delete(productId);
      if (btn) btn.innerHTML = '🤍 Save';
      toast('Removed from favourites');
    } else {
      await API.post(`/api/favourites/${productId}`);
      state.favouriteIds.add(productId);
      if (btn) btn.innerHTML = '❤️ Saved';
      toast('Saved to favourites', 'success');
    }
  } catch (e) { toast(e.message, 'error'); }
}

async function loadFavourites() {
  if (!state.user) {
    document.getElementById('favourites-grid').innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">❤️</div>
        <p>Sign in to see your saved products.</p>
        <br><button class="btn btn-primary" onclick="navigate('login')">Sign in</button>
      </div>
    `;
    return;
  }
  const grid = document.getElementById('favourites-grid');
  grid.innerHTML = `<div class="loading-overlay" style="grid-column:1/-1">Loading… <span class="spinner"></span></div>`;
  try {
    const favs = await API.get('/api/favourites');
    if (!favs.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🤍</div><p>No saved products yet. Browse and tap Save.</p></div>`;
      return;
    }
    state.products = favs.map(f => f.product);
    grid.innerHTML = '';
    renderProductsInto(favs.map(f => f.product), grid);
  } catch (e) { grid.innerHTML = `<p style="color:var(--danger)">Error: ${e.message}</p>`; }
}

function renderProductsInto(products, grid) {
  grid.innerHTML = products.map(p => {
    const prices = (p.prices || []).sort((a, b) => a.price_eur - b.price_eur);
    const isFav = state.favouriteIds.has(p.id);
    const priceRows = prices.slice(0, 3).map((pr, i) => `
      <div class="price-row">
        ${storeBadge(pr.store)}
        <span class="price-val${i === 0 ? ' price-best' : ''}">€${pr.price_eur.toFixed(2)}</span>
        ${pr.discount_pct ? `<span class="badge-discount">-${pr.discount_pct}%</span>` : ''}
      </div>
    `).join('');
    return `
      <div class="product-card" onclick="openProduct(${p.id})">
        <div class="product-img">${p.image_url || '🛒'}</div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-meta">${[p.brand, p.unit].filter(Boolean).join(' · ')}</div>
          ${priceRows}
          <div class="card-actions" onclick="event.stopPropagation()">
            <button class="btn btn-ghost btn-sm" onclick="toggleFavourite(${p.id}, this)">
              ${isFav ? '❤️ Saved' : '🤍 Save'}
            </button>
            <button class="btn btn-primary btn-sm" onclick="addToList(${p.id})">+ List</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}


/* ── Deals page ──────────────────────────────────────────────────────────── */

async function loadDeals() {
  const grid = document.getElementById('deals-grid');
  grid.innerHTML = `<div class="loading-overlay" style="grid-column:1/-1">Loading deals… <span class="spinner"></span></div>`;
  try {
    const products = await API.get('/api/products?on_sale=true&limit=40');
    if (!products.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🏷️</div><p>No deals found this week.</p></div>`;
      return;
    }

    // Flatten to individual deals per store
    const deals = [];
    products.forEach(p => {
      (p.prices || []).filter(pr => pr.discount_pct).forEach(pr => {
        deals.push({ product: p, price: pr });
      });
    });
    deals.sort((a, b) => b.price.discount_pct - a.price.discount_pct);

    grid.innerHTML = deals.map(({ product: p, price: pr }) => `
      <div class="deal-card" onclick="openProduct(${p.id})">
        <div class="deal-badge">-${pr.discount_pct}%</div>
        <div class="deal-img">${p.image_url || '🛒'}</div>
        <div class="deal-body">
          <div class="deal-store" style="color:${STORE_COLORS[pr.store.slug] || '#888'}">${pr.store.name}</div>
          <div class="deal-name">${p.name}</div>
          <div class="deal-price">
            <span class="deal-price-now">€${pr.price_eur.toFixed(2)}</span>
            ${pr.original_price_eur ? `<span class="deal-price-was">€${pr.original_price_eur.toFixed(2)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  } catch (e) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><p>Error: ${e.message}</p></div>`;
  }
}


/* ── Shopping list ───────────────────────────────────────────────────────── */

async function loadShoppingList() {
  if (!state.user) {
    document.getElementById('list-section').innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🧺</div>
        <p>Sign in to create and compare shopping lists.</p>
        <br><button class="btn btn-primary" onclick="navigate('login')">Sign in</button>
      </div>
    `;
    return;
  }

  document.getElementById('list-section').innerHTML = `<div class="loading-overlay">Loading… <span class="spinner"></span></div>`;

  try {
    state.lists = await API.get('/api/lists');
    if (!state.lists.length) {
      // Create a default list
      const newList = await API.post('/api/lists', { name: 'My Shopping List' });
      state.lists = [newList];
    }
    state.activeListId = state.lists[0].id;
    renderShoppingListUI();
  } catch (e) {
    document.getElementById('list-section').innerHTML = `<p style="color:var(--danger)">Error: ${e.message}</p>`;
  }
}

function renderShoppingListUI() {
  const list = state.lists.find(l => l.id === state.activeListId);
  const items = list?.items || [];

  const itemsHTML = items.length
    ? items.map(item => `
        <div class="list-item">
          <span class="list-item-emoji">${item.product.image_url || '🛒'}</span>
          <span class="list-item-name">${item.product.name}</span>
          <span class="list-item-qty">×${item.quantity}</span>
          <button class="list-item-remove" onclick="removeFromList(${item.id})" title="Remove">✕</button>
        </div>
      `).join('')
    : `<div class="empty-state" style="padding:2rem 0"><div class="empty-icon">🧺</div><p>Your list is empty. Search for products and tap "+ List".</p></div>`;

  document.getElementById('list-section').innerHTML = `
    <div class="list-layout">
      <div class="card">
        <div class="card-title">🧺 ${list?.name || 'My List'}</div>
        ${itemsHTML}
        ${items.length ? `
          <div style="margin-top:1rem">
            <button class="btn btn-primary" onclick="compareBasket()">📊 Compare stores</button>
          </div>
        ` : ''}
      </div>
      <div class="card" id="comparison-card">
        <div class="card-title">📊 Store Comparison</div>
        <div style="color:var(--text-muted);font-size:.88rem">
          Add items to your list, then tap "Compare stores" to find the best deal.
        </div>
      </div>
    </div>
  `;
}

async function addToList(productId) {
  if (!state.user) { navigate('login'); toast('Sign in to use shopping lists'); return; }
  try {
    if (!state.activeListId) {
      const newList = await API.post('/api/lists', { name: 'My Shopping List' });
      state.activeListId = newList.id;
      state.lists = [newList];
    }
    await API.post(`/api/lists/${state.activeListId}/items`, { product_id: productId, quantity: 1 });
    toast('Added to list ✓', 'success');
  } catch (e) { toast(e.message, 'error'); }
}

async function removeFromList(itemId) {
  try {
    await API.delete(`/api/lists/${state.activeListId}/items/${itemId}`);
    const listIdx = state.lists.findIndex(l => l.id === state.activeListId);
    if (listIdx !== -1) {
      state.lists[listIdx].items = state.lists[listIdx].items.filter(i => i.id !== itemId);
    }
    renderShoppingListUI();
    toast('Removed from list');
  } catch (e) { toast(e.message, 'error'); }
}

async function compareBasket() {
  const card = document.getElementById('comparison-card');
  if (!card) return;
  card.innerHTML = `<div class="card-title">📊 Store Comparison</div><div class="loading-overlay">Comparing… <span class="spinner"></span></div>`;

  try {
    const result = await API.get(`/api/lists/${state.activeListId}/compare`);
    const rows = result.totals.map(t => {
      const isCheap = t.store.slug === result.cheapest_store?.slug;
      return `
        <div class="basket-result${isCheap ? ' cheapest-store' : ''}">
          <div>
            <div class="basket-store-name">
              <span class="store-badge" style="background:${STORE_COLORS[t.store.slug] || '#888'}">${t.store.name}</span>
              ${isCheap ? '<span class="cheapest-label" style="margin-left:.4rem">Best Deal 🏆</span>' : ''}
            </div>
            ${t.items_missing ? `<div class="basket-missing">⚠️ ${t.items_missing} item(s) not available</div>` : ''}
          </div>
          <div class="basket-price">€${t.total_eur.toFixed(2)}</div>
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <div class="card-title">📊 Store Comparison</div>
      ${rows}
    `;
  } catch (e) {
    card.innerHTML = `<div class="card-title">📊 Store Comparison</div><p style="color:var(--danger)">Error: ${e.message}</p>`;
  }
}


/* ── Price alert dialog ──────────────────────────────────────────────────── */

function openAlertDialog(productId, productName) {
  const target = prompt(`Set price alert for "${productName}"\nAlert me when price drops below (€):`);
  if (target === null) return;
  const price = parseFloat(target);
  if (isNaN(price) || price <= 0) { toast('Invalid price', 'error'); return; }
  API.post('/api/alerts', { product_id: productId, target_price_eur: price })
    .then(() => toast(`Alert set for €${price.toFixed(2)} ✓`, 'success'))
    .catch(e => toast(e.message, 'error'));
}


/* ── Auth pages ──────────────────────────────────────────────────────────── */

async function doLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  try {
    const data = await API.login(email, password);
    setToken(data.access_token);
    state.user = await API.get('/api/auth/me');
    await loadFavouriteIds();
    renderAuthNav();
    navigate('search');
    toast(`Welcome back, ${state.user.full_name || state.user.email.split('@')[0]}! 👋`, 'success');
  } catch (err) {
    errEl.textContent = err.message;
  }
}

async function doRegister(e) {
  e.preventDefault();
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const name = document.getElementById('reg-name').value;
  const errEl = document.getElementById('reg-error');
  try {
    await API.post('/api/auth/register', { email, password, full_name: name });
    const data = await API.login(email, password);
    setToken(data.access_token);
    state.user = await API.get('/api/auth/me');
    renderAuthNav();
    navigate('search');
    toast('Account created! 🎉', 'success');
  } catch (err) {
    errEl.textContent = err.message;
  }
}


/* ── Bootstrap ───────────────────────────────────────────────────────────── */

async function init() {
  // Load initial data
  try {
    [state.stores, state.categories] = await Promise.all([
      API.get('/api/stores'),
      API.get('/api/categories'),
    ]);
  } catch {}

  renderStoreChips();
  renderCategoryChips();
  setupSearchFilters();

  // Restore session
  await loadCurrentUser();
  renderAuthNav();

  // Navigate to default page
  navigate('search');
}

document.addEventListener('DOMContentLoaded', init);
