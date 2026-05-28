import styles from './Button.module.css';

const VARIANT_CLASS = { primary: 'primary', outline: 'outline', ghost: 'ghost' };

export default function Button({ label, onClick, variant = 'primary' }) {
  const variantClass = styles[VARIANT_CLASS[variant] ?? 'primary'];
  return (
    <button
      className={`${styles.btn} ${variantClass ?? styles.primary}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
