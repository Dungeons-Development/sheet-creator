import { createRoot } from 'react-dom/client';
import { Main } from './components/main';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);
root.render(<Main />);

