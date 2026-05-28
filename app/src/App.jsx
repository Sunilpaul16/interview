import useTheme from './hooks/useTheme';
import ProductsPage from './pages/ProductsPage';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  return <ProductsPage theme={theme} onToggleTheme={toggleTheme} />;
}
