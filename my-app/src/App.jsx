// src/App.js
import React, { useState, useEffect } from 'react';
import HomePage from './homepage';
import LoginPage from './Login'; // <-- Updated import
import SignupPage from './Signup'; // <-- Updated import
import DashboardPage from './dashboard';

export default function App() {
    // This state now acts as our "router"
    const [page, setPage] = useState('home'); // 'home', 'login', 'signup', 'dashboard'
    
    // Theme state is kept here as it's a global concern
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

    // Effect to scroll to the top of the page on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    // This function decides which page component to render
    const renderPage = () => {
        switch (page) {
            case 'login':
                return <LoginPage setPage={setPage} />; // <-- Updated component
            case 'signup':
                return <SignupPage setPage={setPage} />; // <-- Updated component
            case 'dashboard':
                return <DashboardPage theme={theme} toggleTheme={toggleTheme} setPage={setPage} />;
            case 'home':
            default:
                return <HomePage setPage={setPage} theme={theme} toggleTheme={toggleTheme} />;
        }
    };

    return (
        <div className="font-sans antialiased">
            {renderPage()}
        </div>
    );
}