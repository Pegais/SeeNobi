import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Single Valorant theme - no toggle needed
export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: 'valorant' }}>
      {children}
    </ThemeContext.Provider>
  );
};

