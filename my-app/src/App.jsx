import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Page Components ---
// These are imported from your project files.
import DashboardPage from './DashBoard.jsx';
import ProjectPage from './ProjectPage.jsx';
import TaskFormPage from './TaskFormPage.jsx';
import NewProjectPage from './NewProjectPage.jsx';

// Mock components for routes that haven't been created yet.
const LoginPage = () => <div className="p-4">Login Page</div>;
const SignupPage = () => <div className="p-4">Signup Page</div>;


export default function App() {
  // Global theme state management
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
    
  // This effect applies the 'dark' class to the main <html> element
  // when the theme state changes, enabling Tailwind's dark mode.
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
          {/* --- Redirect from root to dashboard --- */}
          <Route 
            path="/" 
            element={<Navigate to="/dashboard" />} 
          />

          {/* Authentication Pages */}
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          <Route 
            path="/signup" 
            element={<SignupPage />} 
          />

          {/* Main Application Pages */}
          <Route 
            path="/dashboard" 
            element={<DashboardPage theme={theme} toggleTheme={toggleTheme} />} 
          />
          <Route 
            path="/dashboard/new-project" 
            element={<NewProjectPage theme={theme} toggleTheme={toggleTheme} />} 
          />
          <Route 
            path="/projects/:projectId" 
            element={<ProjectPage theme={theme} toggleTheme={toggleTheme} />} 
          />
          <Route 
            path="/projects/:projectId/new-task" 
            element={<TaskFormPage theme={theme} toggleTheme={toggleTheme} />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


