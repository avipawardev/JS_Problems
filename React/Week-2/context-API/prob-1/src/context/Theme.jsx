import React, { createContext, useState } from 'react';

export const ThemeState = createContext();

export const Theme = ({ children }) => {

  const [theme, setTheme] = useState('light');

  return (
    <ThemeState.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeState.Provider>
  );
};
