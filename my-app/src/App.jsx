import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Page Components ---
import DashboardPage from './DashBoard.jsx';
import Home from './homepage';
import ProjectPage from './ProjectPage.jsx';
import TaskFormPage from './TaskFormPage.jsx';
import NewProjectPage from './NewProjectPage.jsx';
import LoginPage from './Login.jsx';
import SignupPage from './Signup.jsx';


export default function App() {
  // Global theme state management
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
    
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
          {/* Redirect from root to dashboard */}
          <Route 
            path="/" 
            element={<Home/>} 
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