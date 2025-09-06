import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Assuming these are your page components
// They no longer need a 'setPage' prop
import HomePage from './homepage';
import LoginPage from './Login';
import SignupPage from './Signup';
import DashboardPage from './dashboard';

export default function App() {
  // Theme state is now a global concern, managed at the top level
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
    
  // Effect to apply the 'dark' class to the <html> element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="font-sans antialiased">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage theme={theme} toggleTheme={toggleTheme} />} 
          />
          <Route 
            path="/login" 
            element={<LoginPage theme={theme} toggleTheme={toggleTheme} />} 
          />
          <Route 
            path="/signup" 
            element={<SignupPage theme={theme} toggleTheme={toggleTheme} />} 
          />
          <Route 
            path="/dashboard" 
            element={<DashboardPage theme={theme} toggleTheme={toggleTheme} />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}