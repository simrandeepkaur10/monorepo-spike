// apps/web/src/app/App.tsx
import { ThemeProvider } from './ThemeProvider';
import { HomePage } from '../components/HomePage';

export function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}