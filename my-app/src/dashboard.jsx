import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- Icon Components (inline SVGs) ---
const Icon = ({ name, size = 20, className = '' }) => {
    const icons = {
        sun: <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />,
        moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />,
        search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
        bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
        plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
        users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
        clipboard: <><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></>,
        moreHorizontal: <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>,
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {icons[name]}
        </svg>
    );
};

// --- Mock Data ---
const mockDashboardProjects = [
    { id: 'rd-sales', name: 'RD Sales', description: 'Tasks related to the R&D and Sales departments integration for Q3.', memberCount: 5, taskCount: 3, },
    { id: 'marketing-q4', name: 'Marketing Launch Q4', description: 'All tasks for the Q4 product marketing launch campaign.', memberCount: 8, taskCount: 21, },
    { id: 'website-redesign', name: 'Website Redesign', description: 'A complete overhaul of the main company website and user portal.', memberCount: 4, taskCount: 45, },
    { id: 'api-development', name: 'API Development', description: 'Building the new V3 API for our main product.', memberCount: 6, taskCount: 12, },
];

// --- UI Components ---
const Sidebar = ({ theme, toggleTheme }) => (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
            <span className="font-bold text-2xl text-indigo-600 dark:text-indigo-400">SynergySphere</span>
        </div>
        <div className="flex flex-col flex-grow p-4 space-y-2">
            <nav className="flex-grow">
                <Link to="/dashboard" className="flex items-center px-4 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-lg">Projects</Link>
                <Link to="#" className="flex items-center px-4 py-2 mt-2 text-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">My Tasks</Link>
            </nav>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                    <div className="flex items-center p-1 bg-white dark:bg-gray-800 rounded-full">
                        <button onClick={toggleTheme} className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}><Icon name="sun" size={16} /></button>
                        <button onClick={toggleTheme} className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}><Icon name="moon" size={16} /></button>
                    </div>
                </div>
                <div className="flex items-center space-x-3 p-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">TU</div>
                    <div>
                        <p className="font-semibold text-sm text-gray-800 dark:text-white">Test User</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">user@email.com</p>
                    </div>
                    <button className="ml-auto text-gray-500 dark:text-gray-400"><Icon name="moreHorizontal" /></button>
                </div>
            </div>
        </div>
    </div>
);

const Header = () => (
    <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Projects</h2>
            <div className="flex items-center space-x-4">
                <div className="relative hidden sm:block">
                    <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-48 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><Icon name="bell" size={20} /></button>
                <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"><Icon name="plus" size={16} /><span>New Project</span></button>
            </div>
        </div>
    </header>
);

const ProjectCard = ({ project }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 h-full flex flex-col hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 cursor-pointer">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{project.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{project.description}</p>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2"><Icon name="users" size={16}/> {project.memberCount} Members</span>
            <span className="flex items-center gap-2"><Icon name="clipboard" size={16}/> {project.taskCount} Tasks</span>
        </div>
    </div>
);

export default function DashboardPage({ theme, toggleTheme }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Sidebar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockDashboardProjects.map(project => (
                        <Link to={`/projects/${project.id}`} key={project.id}>
                            <ProjectCard project={project} />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    </div>
  );
}
