import Button from './Button';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ items, onClose }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.drawer} aria-label="Shopping cart">
        <div className={styles.header}>
          <h2 className={styles.heading}>Cart ({items.reduce((s, i) => s + i.qty, 0)})</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <p className={styles.empty}>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                <img className={styles.itemImage} src={item.image} alt={item.title} />
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemMeta}>Qty: {item.qty}</p>
                </div>
                <span className={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            <span>Total</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>
          <Button label="Checkout" onClick={() => alert('Checkout coming soon!')} />
        </div>
      </aside>
    </>
  );
}
