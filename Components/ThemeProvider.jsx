import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Start with a placeholder state - we'll set the real value in useEffect
  const [darkMode, setDarkMode] = useState(null);

  // Initialize dark mode on component mount
  useEffect(() => {
    // Check if there's a saved preference
    const savedPreference = localStorage.getItem('darkMode');

    if (savedPreference === 'light') {
      // User previously selected light mode
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Either no preference or dark mode was chosen
      // Set default to dark mode
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      // Save this preference explicitly
      localStorage.setItem('darkMode', 'dark');
    }
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    // Update document class
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'light');
    }
  };

  // Only render children when darkMode has been initialized
  if (darkMode === null) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};