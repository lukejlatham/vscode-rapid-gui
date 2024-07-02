import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container); // Now container is asserted to be non-null
root.render(
  <App />
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))