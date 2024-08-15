import { createRoot } from 'react-dom/client';
import App from './App';
import Wrapper from './components/Wrapper';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container); // Now container is asserted to be non-null
root.render(
  <Wrapper>
    <App />
  </Wrapper>
);
