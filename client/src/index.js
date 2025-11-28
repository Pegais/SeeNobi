import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { lazyLoadImages, performanceMonitor } from './utils/performance';

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.mark('app-start');
}

// Initialize lazy loading for images
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages();
    });
  } else {
    lazyLoadImages();
  }
  
  // Re-run lazy loading when new content is added
  const observer = new MutationObserver(() => {
    lazyLoadImages();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    performanceMonitor.mark('app-loaded');
    const duration = performanceMonitor.measure('app-load-time', 'app-start', 'app-loaded');
    if (duration) {
      console.log(`App loaded in ${duration.toFixed(2)}ms`);
    }
  });
}

