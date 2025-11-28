/**
 * Performance optimization utilities
 * Includes caching, lazy loading helpers, and performance monitoring
 */

// Cache for API responses and computed values
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Cache with expiration
 */
export const cacheWithExpiry = {
  set: (key, value, duration = CACHE_DURATION) => {
    const expiry = Date.now() + duration;
    cache.set(key, { value, expiry });
  },
  
  get: (key) => {
    const item = cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      cache.delete(key);
      return null;
    }
    
    return item.value;
  },
  
  clear: () => {
    cache.clear();
  },
  
  has: (key) => {
    const item = cache.get(key);
    if (!item) return false;
    
    if (Date.now() > item.expiry) {
      cache.delete(key);
      return false;
    }
    
    return true;
  }
};

/**
 * Debounce function for performance
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Lazy load images with intersection observer
 */
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
  }
};

/**
 * Preload critical resources
 */
export const preloadResource = (href, as = 'script') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

/**
 * Performance monitoring
 */
export const performanceMonitor = {
  marks: {},
  
  mark: (name) => {
    if ('performance' in window && 'mark' in window.performance) {
      window.performance.mark(name);
      performanceMonitor.marks[name] = performance.now();
    }
  },
  
  measure: (name, startMark, endMark) => {
    if ('performance' in window && 'measure' in window.performance) {
      try {
        window.performance.measure(name, startMark, endMark);
        const measure = window.performance.getEntriesByName(name)[0];
        return measure.duration;
      } catch (e) {
        console.warn('Performance measure failed:', e);
        return null;
      }
    }
    return null;
  },
  
  getMetrics: () => {
    if ('performance' in window && 'timing' in window.performance) {
      const timing = window.performance.timing;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
        firstPaint: timing.responseEnd - timing.navigationStart
      };
    }
    return null;
  }
};

/**
 * Optimize scroll performance
 */
export const optimizeScroll = (callback, options = {}) => {
  const { useRAF = true, throttleMs = 16 } = options;
  
  if (useRAF) {
    let ticking = false;
    return (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          callback(e);
          ticking = false;
        });
        ticking = true;
      }
    };
  } else {
    return throttle(callback, throttleMs);
  }
};

/**
 * Memoize expensive computations
 */
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

