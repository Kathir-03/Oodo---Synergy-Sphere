import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// --- Icon Components (inline SVGs) ---
const Icon = ({ name, size = 20, className = '' }) => {
    const icons = {
        sun: <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />,
        moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />,
        search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
        bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
        plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
        chevronRight: <path d="m9 18 6-6-6-6" />,
        moreHorizontal: <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>,
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {icons[name]}
        </svg>
    );
};

// --- Mock Data (Should be in a separate file in a real app) ---
const mockUsers = {
    'user-1': { name: 'Alice', avatar: 'A' }, 'user-2': { name: 'Bob', avatar: 'B' }, 'user-3': { name: 'Charlie', avatar: 'C' },
    'user-4': { name: 'Diana', avatar: 'D' }, 'user-5': { name: 'Eve', avatar: 'E' },
};
const mockDashboardProjects = [
    { id: 'rd-sales', name: 'RD Sales' }, { id: 'marketing-q4', name: 'Marketing Launch Q4' },
    { id: 'website-redesign', name: 'Website Redesign' }, { id: 'api-development', name: 'API Development' },
];
const mockProjectTasks = [
    { id: 'task-1', projectId: 'rd-sales', title: 'Optimize Website Controllers', assigneeId: 'user-1', dueDate: '21/03/23', image: 'https://placehold.co/600x400/8B5CF6/FFFFFF?text=Optimization', tags: [{ text: 'Feedback', color: 'bg-blue-200 text-blue-800' }, { text: 'Refactor', color: 'bg-yellow-200 text-yellow-800' }] },
    { id: 'task-2', projectId: 'rd-sales', title: 'Remove Sales App 😢', assigneeId: 'user-2', dueDate: '21/03/23', image: 'https://placehold.co/600x400/EC4899/FFFFFF?text=Deprecation', tags: [{ text: 'Feedback', color: 'bg-blue-200 text-blue-800' }, { text: 'Delete', color: 'bg-red-200 text-red-800' }] },
    { id: 'task-3', projectId: 'rd-sales', title: 'Stripe Integration', assigneeId: 'user-3', dueDate: '21/03/23', image: 'https://placehold.co/600x400/10B981/FFFFFF?text=Payments', tags: [{ text: 'Improvement', color: 'bg-green-200 text-green-800' }, { text: 'Payment Provider', color: 'bg-purple-200 text-purple-800' }] },
    { id: 'task-4', projectId: 'marketing-q4', title: 'Draft press release', assigneeId: 'user-4', dueDate: '25/10/23', image: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=Press', tags: [{ text: 'Content', color: 'bg-pink-200 text-pink-800' }] },
    { id: 'task-5', projectId: 'marketing-q4', title: 'Plan social media campaign', assigneeId: 'user-1', dueDate: '30/10/23', image: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=Social', tags: [{ text: 'Planning', color: 'bg-indigo-200 text-indigo-800' }] },
    { id: 'task-6', projectId: 'website-redesign', title: 'Design new homepage mockups', assigneeId: 'user-5', dueDate: '15/11/23', image: 'https://placehold.co/600x400/6366F1/FFFFFF?text=Design', tags: [{ text: 'UI/UX', color: 'bg-teal-200 text-teal-800' }] },
];

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
                <Link to={crumb.path} className={`${crumb.path ? 'hover:underline text-indigo-600 dark:text-indigo-400' : 'font-medium text-gray-700 dark:text-gray-200'}`}>
                    {crumb.label}
                </Link>
            </React.Fragment>
        ))}
    </div>
);

const TaskCard = ({ task }) => {
    const assignee = mockUsers[task.assigneeId];
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col group hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 cursor-pointer">
            <img src={task.image} alt={task.title} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                    {task.tags.map(tag => (
                        <span key={tag.text} className={`px-2 py-0.5 text-xs font-semibold rounded-full ${tag.color}`}>
                            {tag.text}
                        </span>
                    ))}
                </div>
                <h3 className="font-bold text-md text-gray-900 dark:text-white flex-grow group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{task.title}</h3>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{task.dueDate}</span>
                    {assignee && (
                         <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs" title={assignee.name}>
                             {assignee.avatar}
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---
export default function ProjectPage({ theme, toggleTheme }) {
    const { projectId } = useParams();
    const navigate = useNavigate();
    
    const project = mockDashboardProjects.find(p => p.id === projectId);
    const tasks = mockProjectTasks.filter(t => t.projectId === projectId);
    
    const crumbs = [
        { label: 'Projects', path: '/dashboard' },
        { label: project ? project.name : 'Project', path: null }
    ];

    if (!project) {
        return <div className="p-6">Project not found.</div>;
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar theme={theme} toggleTheme={toggleTheme} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header>
                    <button onClick={() => navigate(`/projects/${projectId}/new-task`)} className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                        <Icon name="plus" size={16} />
                        <span>New Task</span>
                    </button>
                </Header>
                <main className="flex-1 overflow-y-auto p-6">
                    <Breadcrumbs crumbs={crumbs} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map(task => (
                            <TaskCard task={task} key={task.id} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}