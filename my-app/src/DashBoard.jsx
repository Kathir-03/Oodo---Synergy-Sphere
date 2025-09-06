import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, Bell, Search, Settings, MoreHorizontal, Plus, Briefcase, List, UserCircle, CheckSquare, Paperclip } from 'lucide-react';

// Reusable Button Component,111111111111
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
    const navigate = useNavigate();
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
                    <span 
                        onClick={() => navigate('/')}
                        className="font-bold text-xl text-indigo-600 dark:text-indigo-400 ml-3 md:ml-0 cursor-pointer"
                    >
                        Company
                    </span>
                </div>
                <div className="flex-grow max-w-lg mx-4 hidden sm:block">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search projects..."
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
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => navigate('/login')}>Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// --- Sidebar Component ---
const Sidebar = ({ isCollapsed, onToggle, theme, toggleTheme, userData }) => {
    const navigate = useNavigate();
    const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';
    const collapsedClass = isCollapsed ? '' : 'items-center justify-center';
   
    return (
        <>
            {isCollapsed && (
                <div 
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
                    onClick={onToggle}
                ></div>
            )}
            
            <aside 
                className={`fixed inset-y-0 left-0 z-50 flex flex-col p-4 space-y-8 transition-all duration-300 transform md:relative md:translate-x-0 ${isCollapsed ? 'w-20' : 'w-64'} ${isCollapsed ? '-translate-x-full' : 'translate-x-0'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    {!isCollapsed && <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">SynergySphere</h1>}
                    <button onClick={onToggle} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Menu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                {/* Nav */}
                <nav className="flex-grow">
                    <ul className="space-y-2">
                        <li>
                            <a href="#projects" className={`flex items-center space-x-3 p-2 rounded-md bg-indigo-50 dark:bg-gray-700/50 hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors`}>
                                <Briefcase className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                {!isCollapsed && <span className="text-gray-800 dark:text-gray-200">Projects</span>}
                            </a>
                        </li>
                        <li>
                            <a href="#tasks" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                                <List className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                {!isCollapsed && <span className="text-gray-800 dark:text-gray-200">My Tasks</span>}
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* Footer */}
                <div className="space-y-6">
                    <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded-md flex items-center justify-center space-x-2 border border-gray-200 dark:border-gray-600">
                        <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-yellow-500' : 'text-gray-500'}`} />
                        <div onClick={toggleTheme} className="w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer">
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-6' : ''}`}></div>
                        </div>
                        <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-gray-500'}`} />
                    </div>
                    
                    <button
                        onClick={async () => {
                            localStorage.removeItem('userData');
                            try{
                                await fetch(`http://127.0.0.1:8000/api/auth/logout/`, {
                                    method: 'POST',
                                    credentials: 'include',
                                });
                            }catch(err){console.error(err)}
                            navigate('/login');
                        }}
                        className="flex items-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700 w-full"
                    >
                        <UserCircle className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                        {!isCollapsed && userData && (
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">
                                    {userData.first_name} {userData.last_name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</p>
                            </div>
                        )}
                    </button>
                    <button
                        onClick={async () => {
                            localStorage.removeItem('userData');
                            try{
                                await fetch(`http://127.0.0.1:8000/api/auth/logout/`, {
                                    method: 'POST',
                                    credentials: 'include',
                                });
                            }catch(err){console.error(err)}
                            navigate('/login');
                        }}
                        className="w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                        Log Out
                    </button>
                </div>
            </aside>
        </>
    );
};

// --- Project Card Component ---
const ProjectCard = ({ project }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex flex-col space-y-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
        <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
                <span key={tag.name} className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tag.color}`}>{tag.name}</span>
            ))}
        </div>
        <div className="flex-grow w-full h-24 bg-gray-100 dark:bg-gray-700/50 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600"><span className="text-gray-400 dark:text-gray-500 text-sm">Visual Preview</span></div>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
            <span>{project.date}</span>
            <div className="flex items-center space-x-3">
                <div className="flex -space-x-2"><img className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" src="https://placehold.co/24x24/c0e3fa/334155?text=A" alt="" /><img className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" src="https://placehold.co/24x24/f7d8c4/334155?text=B" alt="" /></div>
                <span className="flex items-center space-x-1"><CheckSquare size={16} /><span className="text-xs">{project.tasks} tasks</span></span>
                <span className="flex items-center space-x-1"><Paperclip size={16} /><span className="text-xs">{project.files} files</span></span>
            </div>
        </div>
    </div>
);

// --- Projects View Component ---
const ProjectsView = ({ isSidebarCollapsed, projects }) => {
    const mainContentMargin = isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64';

    return (
        <div className={`flex-grow p-6 transition-all duration-300 ${mainContentMargin} pt-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h2>
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"><MoreHorizontal className="w-6 h-6" /></button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"><Plus className="w-5 h-5" /><span>New Project</span></button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                       {projects.length > 0 ? (
                           projects.map(p => <ProjectCard key={p.title} project={p} />)
                       ) : (
                           <p>No projects found.</p>
                       )}
                   </div>
        </div>
    );
};


// --- Main DashboardPage Component ---
export default function DashboardPage({ theme, toggleTheme }) {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [userData, setUserData] = useState(null);
    const [projects, setProjects] = useState([]);
    const baseURL = 'http://127.0.0.1:8000';

    useEffect(() => {
        try {
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error("Failed to parse user data from localStorage", error);
            localStorage.removeItem('userData');
            navigate('/login');
        }
    }, [navigate]);

    // Fetch projects data
    useEffect(() => {
        const fetchProjects = async () => {
            if (!userData) return;
            
            try {
                const response = await fetch(`${baseURL}/api/projects/`, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                } else {
                    console.error("Failed to fetch projects:", response.statusText);
                }
            } catch (error) {
                console.error("An error occurred while fetching projects:", error);
            }
        };

        fetchProjects();
    }, [userData]); // Re-fetch projects if userData changes

    if (!userData) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
            <Sidebar 
                isCollapsed={isSidebarCollapsed} 
                onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)} 
                theme={theme} 
                toggleTheme={toggleTheme} 
                userData={userData} 
            />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <header className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                    <div className="text-sm font-semibold"><span className="text-indigo-500">&gt;</span> Projects</div>
                    <div className="flex items-center space-x-4 w-1/2 max-w-lg">
                        <input type="text" placeholder="Search projects..." className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <div className="relative">
                            <button onClick={() => setShowNotifications(!showNotifications)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Bell className="w-6 h-6" />
                            </button>
                            {showNotifications && <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20 p-4 space-y-3"><p className="font-semibold border-b dark:border-gray-700 pb-2">Notifications</p><div>Notification 1</div><div>Notification 2</div></div>}
                        </div>
                        <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Settings className="w-6 h-6" />
                        </button>
                    </div>
                </header>
                <ProjectsView isSidebarCollapsed={isSidebarCollapsed} projects={projects} />
            </main>
        </div>
    );
};