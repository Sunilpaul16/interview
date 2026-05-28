import { useState, useEffect, useMemo } from 'react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import styles from './ProductsPage.module.css';

export default function ProductsPage({ theme, onToggleTheme }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ['all', ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const totalItemCount = cartItems.reduce((s, i) => s + i.qty, 0);

  function handleAddToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setDrawerOpen(true);
  }

  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <h1 className={styles.navTitle}>ShopNow</h1>
        <div className={styles.navActions}>
          <Button
            label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            variant="ghost"
            onClick={onToggleTheme}
          />
          <div className={styles.cartBtn}>
            <Button
              label="Cart"
              variant="ghost"
              onClick={() => setDrawerOpen(true)}
            />
            {totalItemCount > 0 && (
              <span className={styles.badge}>{totalItemCount}</span>
            )}
          </div>
        </div>
      </nav>

      <div className={styles.controls}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
        <select
          className={styles.categorySelect}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {!loading && !error && (
        <p className={styles.resultsCount}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
        </p>
      )}

      {loading && <p className={styles.loading}>Loading products…</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className={styles.noResults}>No products match your search.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      )}

      {drawerOpen && (
        <CartDrawer items={cartItems} onClose={() => setDrawerOpen(false)} />
      )}
    </div>
  );
}
