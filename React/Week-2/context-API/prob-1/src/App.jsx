import React, { useContext } from 'react';
import {ThemeState } from './context/Theme';
import Child from './components/Child';

const App = () => {
  const { theme, setTheme } = useContext(ThemeState);

  return (
      <div>
        <h1>Current Theme: {theme}</h1>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
        <Child/>
      </div>
  );
};

export default App;
