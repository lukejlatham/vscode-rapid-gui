import React from 'react';
import ReactDOM from 'react-dom';

const MainPage = () => {
  return (
    <div>
      <h1>Welcome to the React Landing Page</h1>
      <p>This is the main landing page content.</p>
    </div>
  );
};

// Render the React component into a root element
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<MainPage />, rootElement);
}
