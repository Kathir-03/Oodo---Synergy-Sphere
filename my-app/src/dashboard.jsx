import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, Search, Sun, Moon, Briefcase, List, Settings, UserCircle, Plus } from 'lucide-react';

// Reusable Button Component for better styling and consistency
const PrimaryButton = ({ children, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
    >
        {children}
    </button>
);

// Theme Toggle Component
const ThemeToggle = ({ theme, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-300"
        aria-label="Toggle theme"
    >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
);

// --- Navbar Component ---
const Navbar = ({ toggleSidebar, theme, toggleTheme }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md dark:shadow-xl fixed w-full z-30 transition-colors duration-300">
            <div className="flex items-center justify-between h-16 px-4 md:px-6">
                <div className="flex items-center">
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden focus:outline-none"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400 ml-3 md:ml-0">Company</span>
                </div>

                <div className="flex-grow max-w-lg mx-4 hidden sm:block">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                    <div className="relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
                        </button>
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-40 border border-gray-200 dark:border-gray-600">
                                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-semibold border-b dark:border-gray-600">Notifications</div>
                                <div className="p-2">
                                    {['Notification 1', 'Notification 2', 'Notification 3'].map((notification, index) => (
                                        <div key={index} className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md">
                                            <span>{notification}</span>
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs">Mark as read</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button 
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 focus:outline-none"
                        >
                            <UserCircle size={32} className="text-indigo-600" />
                        </button>
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-40 border border-gray-200 dark:border-gray-600">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Global / Application settings</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Profile</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// --- Sidebar Component ---
const Sidebar = ({ isOpen, toggleSidebar, theme, toggleTheme }) => {
    const sidebarWidth = isOpen ? 'w-64' : 'w-20';
    const collapsedClass = isOpen ? '' : 'items-center justify-center';

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
            
            <aside 
                className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl border-r border-gray-200 dark:border-gray-700 z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-all duration-300 ease-in-out ${sidebarWidth} flex flex-col`}
            >
                <div className={`h-16 flex items-center px-4 ${collapsedClass} border-b border-gray-200 dark:border-gray-700`}>
                    {isOpen ? (
                        <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">Company</span>
                    ) : (
                        <Briefcase size={24} className="text-indigo-600 dark:text-indigo-400" />
                    )}
                </div>

                <nav className="flex-grow mt-6">
                    <ul>
                        <li>
                            <a href="#" className={`flex items-center py-2 px-4 rounded-lg mx-3 transition-colors duration-200 
                                ${isOpen ? 'justify-start' : 'justify-center'}
                                text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300
                            `}>
                                <Briefcase size={20} className={`${isOpen ? 'mr-3' : ''}`} />
                                {isOpen && <span className="font-medium">Projects</span>}
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className={`flex items-center py-2 px-4 rounded-lg mx-3 transition-colors duration-200
                                ${isOpen ? 'justify-start' : 'justify-center'}
                                text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300
                            `}>
                                <List size={20} className={`${isOpen ? 'mr-3' : ''}`} />
                                {isOpen && <span className="font-medium">My Tasks</span>}
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className={`pb-6 border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col space-y-4 
                    ${isOpen ? 'px-4' : 'items-center justify-center px-2'}
                `}>
                    <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
                        {isOpen && <span className="text-gray-700 dark:text-gray-200 text-sm">Theme</span>}
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    </div>
                    
                    <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} group cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200`}>
                        <UserCircle size={32} className="text-indigo-600" />
                        {isOpen && (
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Test User</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">user@email.com</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

// --- Project Card Component ---
const ProjectCard = ({ project }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-2xl transition-shadow duration-200">
        <img src={project.image} alt={project.title} className="w-full h-32 object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{project.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                    <Briefcase size={14} className="mr-1" /> {project.dueDate}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {project.status}
                </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>{project.progress}% completed</span>
                <div className="w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                        className="bg-indigo-600 h-1.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    </div>
);

// --- Projects View Component ---
const ProjectsView = ({ sidebarOpen, theme, toggleTheme }) => {
    const projects = [
        {
            id: 1,
            title: 'Synergy Sphere',
            description: 'Redesign UI for dashboard',
            image: 'https://via.placeholder.com/300x150/805ad5/ffffff?text=SynergySphere',
            dueDate: '25/03/23',
            status: 'Ongoing',
            progress: 60,
        },
        {
            id: 2,
            title: 'B2B Sales Portal',
            description: 'Develop new features',
            image: 'https://via.placeholder.com/300x150/d946ef/ffffff?text=B2B+Portal',
            dueDate: '25/03/23',
            status: 'Pending',
            progress: 30,
        },
        {
            id: 3,
            title: 'Website Upgrade',
            description: 'Migrate to new server',
            image: 'https://via.placeholder.com/300x150/fbbf24/ffffff?text=Upgrade',
            dueDate: '01/04/23',
            status: 'New',
            progress: 10,
        },
    ];

    const mainBgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';

    return (
        <div 
            className={`flex-grow p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} pt-20 ${mainBgColor}`}
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects View</h1>
                <PrimaryButton onClick={() => alert('New Project clicked!')}>
                    <Plus size={18} className="mr-2" />
                    New Project
                </PrimaryButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};


// --- Dashboard Layout Component (Main Container) ---
export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
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
        <div className={`flex min-h-screen ${theme === 'dark' ? 'dark' : ''} font-sans antialiased`}>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} toggleTheme={toggleTheme} />
            
            <div className="flex flex-col flex-grow">
                <Navbar toggleSidebar={toggleSidebar} theme={theme} toggleTheme={toggleTheme} />
                <ProjectsView sidebarOpen={sidebarOpen} theme={theme} toggleTheme={toggleTheme} />
            </div>
        </div>
    );
}