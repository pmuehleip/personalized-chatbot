import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(sendToVercelAnalytics);
