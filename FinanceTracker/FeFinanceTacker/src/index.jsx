import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // Ensure the path and filename are correct

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);