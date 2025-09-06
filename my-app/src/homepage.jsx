// src/pages/HomePage.js
import React, { useState } from 'react';
import { MenuIcon, XIcon, SunIcon, MoonIcon, TaskIcon, CollaborateIcon, AnalyticsIcon } from './icon';

// --- Reusable Components (Scoped to HomePage) ---

const ThemeToggle = ({ theme, toggleTheme }) => (
    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-300" aria-label="Toggle theme">
        {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
);

const Navbar = ({ setPage, theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-lg fixed w-full z-20 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span onClick={() => setPage('home')} className="font-bold text-2xl text-indigo-600 cursor-pointer">SynergySphere</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                            <button onClick={() => setPage('login')} className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</button>
                            <button onClick={() => setPage('signup')} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">Sign Up</button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-gray-100 dark:bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-end p-2"><ThemeToggle theme={theme} toggleTheme={toggleTheme} /></div>
                        <button onClick={() => { setPage('login'); setIsOpen(false); }} className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors">Login</button>
                        <button onClick={() => { setPage('signup'); setIsOpen(false); }} className="bg-indigo-600 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors">Sign Up</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Hero = ({ setPage }) => (
    <section className="bg-white dark:bg-gray-900 pt-24 md:pt-32 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"><span className="block">Collaborate. Organize.</span><span className="block text-indigo-600">Achieve.</span></h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400">Manage projects and tasks effortlessly with SynergySphere. Bring your team together and build your next great idea.</p>
            <div className="mt-8 flex justify-center"><button onClick={() => setPage('signup')} className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105 duration-300">Get Started</button></div>
        </div>
    </section>
);

const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-center items-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center">{children}</p>
    </div>
);

const Features = () => (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12"><h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Everything You Need to Succeed</h2><p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Powerful features to streamline your workflow.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard icon={<TaskIcon />} title="Intuitive Task Management">Organize your work with assignees, due dates, and priorities. Track progress from start to finish.</FeatureCard>
                <FeatureCard icon={<CollaborateIcon />} title="Seamless Collaboration">Keep your team in sync with shared workspaces, real-time comments, and file sharing.</FeatureCard>
                <FeatureCard icon={<AnalyticsIcon />} title="Insightful Reporting">Gain valuable insights with customizable dashboards and progress reports to make data-driven decisions.</FeatureCard>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} SynergySphere. All rights reserved.</p>
                <div className="flex space-x-6">
                    <a href="#about" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
                    <a href="#privacy" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a>
                    <a href="#contact" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
                </div>
            </div>
        </div>
    </footer>
);


// --- Main HomePage Component ---
export default function HomePage({ setPage, theme, toggleTheme }) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <Navbar setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-grow">
                <Hero setPage={setPage} />
                <Features />
            </main>
            <Footer />
        </div>
    );
}