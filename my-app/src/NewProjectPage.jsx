import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// --- Icon Components (inline SVGs) ---
const Icon = ({ name, size = 20, className = '' }) => {
    const icons = {
        sun: <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />,
        moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />,
        search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
        bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
        chevronRight: <path d="m9 18 6-6-6-6" />,
        moreHorizontal: <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>,
        upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></>,
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {icons[name]}
        </svg>
    );
};

// --- Mock Data ---
const mockUsers = {
    'user-1': { name: 'Alice' }, 'user-2': { name: 'Bob' }, 'user-3': { name: 'Charlie' },
    'user-4': { name: 'Diana' }, 'user-5': { name: 'Eve' },
};

// --- Shared UI Components ---
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

const Header = ({ children }) => (
    <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-end">
             <div className="flex items-center space-x-4">
                <div className="relative hidden sm:block">
                    <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-48 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><Icon name="bell" /></button>
                {children}
            </div>
        </div>
    </header>
);

const Breadcrumbs = ({ crumbs }) => (
    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        {crumbs.map((crumb, index) => (
            <React.Fragment key={index}>
                {index > 0 && <Icon name="chevronRight" size={16} className="mx-1" />}
                {crumb.path ? (
                    <Link to={crumb.path} className="hover:underline text-indigo-600 dark:text-indigo-400">
                        {crumb.label}
                    </Link>
                ) : (
                    <span className="font-medium text-gray-700 dark:text-gray-200">{crumb.label}</span>
                )}
            </React.Fragment>
        ))}
    </div>
);

// --- Main Page Component ---
export default function NewProjectPage({ theme, toggleTheme }) {
    const navigate = useNavigate();

    const crumbs = [
        { label: 'Projects', path: '/dashboard' },
        { label: 'New Project' }
    ];
    
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar theme={theme} toggleTheme={toggleTheme} />
            <div className="flex flex-col flex-1 overflow-hidden">
                 <Header>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => navigate('/dashboard')} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            Discard
                        </button>
                        <button onClick={() => { alert('Save functionality not implemented.'); navigate('/dashboard'); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                            Save
                        </button>
                    </div>
                </Header>
                 <main className="flex-1 overflow-y-auto p-6">
                    <Breadcrumbs crumbs={crumbs} />
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                             <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                                <input type="text" id="tags" placeholder="e.g., Q3, Marketing, High-Impact" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                             <div>
                                <label htmlFor="manager" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Manager</label>
                                <select id="manager" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    {Object.entries(mockUsers).map(([id, user]) => (
                                        <option key={id} value={id}>{user.name}</option>
                                    ))}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deadline</label>
                                <input type="date" id="deadline" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                                <div className="mt-2 flex space-x-8">
                                    <div className="flex items-center">
                                        <input id="priority-low" name="priority" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                        <label htmlFor="priority-low" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Low</label>
                                    </div>
                                     <div className="flex items-center">
                                        <input id="priority-medium" name="priority" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" defaultChecked />
                                        <label htmlFor="priority-medium" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium</label>
                                    </div>
                                     <div className="flex items-center">
                                        <input id="priority-high" name="priority" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                        <label htmlFor="priority-high" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">High</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <Icon name="upload" size={48} className="mx-auto text-gray-400" />
                                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea id="description" rows="4" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                            </div>
                        </form>
                    </div>
                 </main>
            </div>
        </div>
    );
}
