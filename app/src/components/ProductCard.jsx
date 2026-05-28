import Button from './Button';
import styles from './ProductCard.module.css';

export default function ProductCard({ image, title, price, onAddToCart }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt={title} loading="lazy" />
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
      <div className={styles.footer}>
        <Button label="Add to Cart" onClick={onAddToCart} />
      </div>
    </article>
  );
}
