// src/pages/DashboardPage.js
import React, { useState } from 'react';
import { SidebarIcon, SunIcon, MoonIcon, BellIcon, SettingsIcon, MoreIcon, PlusIcon, AttachmentIcon, TasksIcon } from './icon';

// --- Dashboard Sub-Components ---

const Sidebar = ({ isCollapsed, onToggle, theme, toggleTheme, setPage }) => (
    <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col p-4 space-y-8 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
            {!isCollapsed && <h1 className="text-2xl font-bold text-indigo-600">SynergySphere</h1>}
            <button onClick={onToggle} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"><SidebarIcon /></button>
        </div>
        {/* Nav */}
        <nav className="flex-grow">
            <ul className="space-y-2">
                <li><a href="#projects" className="flex items-center space-x-3 p-2 rounded-md bg-indigo-50 dark:bg-gray-700/50"><span className="text-indigo-500 font-bold">&gt;</span>{!isCollapsed && <span>Projects</span>}</a></li>
                <li><a href="#tasks" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50"><span className="font-bold opacity-0">&gt;</span>{!isCollapsed && <span>My Tasks</span>}</a></li>
            </ul>
        </nav>
        {/* Footer */}
        <div className="space-y-6">
            {!isCollapsed && <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded-md flex items-center justify-center space-x-2 border border-gray-200 dark:border-gray-600">
                <SunIcon className={`w-6 h-6 ${theme === 'light' ? 'text-yellow-500' : 'text-gray-500'}`} />
                <div onClick={toggleTheme} className="w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer">
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-6' : ''}`}></div>
                </div>
                <MoonIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-gray-500'}`} />
            </div>}
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <img className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600" src="https://placehold.co/40x40/e2e8f0/334155?text=U" alt="User Avatar" />
                {!isCollapsed && <div><p className="font-semibold text-gray-800 dark:text-gray-100">First User</p><p className="text-xs text-gray-500 dark:text-gray-400">user@email</p></div>}
            </div>
             <button onClick={() => setPage('home')} className="w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">Log Out</button>
        </div>
    </aside>
);

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
                <span className="flex items-center space-x-1"><TasksIcon /><span>{project.tasks} tasks</span></span>
                <span className="flex items-center space-x-1"><AttachmentIcon /><span>{project.files} files</span></span>
            </div>
        </div>
    </div>
);


// --- Main DashboardPage Component ---
export default function DashboardPage({ theme, toggleTheme, setPage }) {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    
    const projects = [
        { title: "RD Services", date: "21/08/23", tasks: 0, files: 10, tags: [{name: 'Services', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'}, {name: 'In-progress', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}] },
        { title: "HD Upgrade", date: "15/07/23", tasks: 5, files: 2, tags: [{name: 'On Hold', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}]},
        { title: "Server Migration", date: "01/09/23", tasks: 22, files: 48, tags: [{name: 'Migration', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}, {name: 'In-progress', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}]}
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)} theme={theme} toggleTheme={toggleTheme} setPage={setPage} />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <header className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                    <div className="text-sm font-semibold"><span className="text-indigo-500">&gt;</span> Projects</div>
                    <div className="flex items-center space-x-4 w-1/2 max-w-lg">
                        <input type="text" placeholder="Search projects..." className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <div className="relative">
                            <button onClick={() => setShowNotifications(!showNotifications)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><BellIcon /></button>
                            {showNotifications && <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20 p-4 space-y-3"><p className="font-semibold border-b dark:border-gray-700 pb-2">Notifications</p><div>Notification 1</div><div>Notification 2</div></div>}
                        </div>
                        <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><SettingsIcon /></button>
                    </div>
                </header>
                <div className="p-6 flex-grow">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h2>
                        <div className="flex items-center space-x-3">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"><MoreIcon /></button>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"><PlusIcon /><span>New Project</span></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                       {projects.map(p => <ProjectCard key={p.title} project={p} />)}
                    </div>
                </div>
            </main>
        </div>
    );
};