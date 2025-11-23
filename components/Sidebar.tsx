import React from 'react';
import type { View } from '../types';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const CodeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);
const FlowIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m0-8v4m-4-2h8m-8 6h8M6 8h12a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2z" />
    </svg>
);
const ServicesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);
const DbIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 17c0 2.21 3.582 4 8 4s8-1.79 8-4" />
    </svg>
);
const ChatIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const AdminIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'chat', label: 'Simulator', icon: <ChatIcon className="h-6 w-6" /> },
    { id: 'admin', label: 'Admin Panel', icon: <AdminIcon className="h-6 w-6" /> },
    { id: 'flows', label: 'Flows', icon: <FlowIcon className="h-6 w-6" /> },
    { id: 'controllers', label: 'Controllers', icon: <CodeIcon className="h-6 w-6" /> },
    { id: 'services', label: 'Services', icon: <ServicesIcon className="h-6 w-6" /> },
    { id: 'db', label: 'DB', icon: <DbIcon className="h-6 w-6" /> },
  ];

  return (
    <nav className="flex flex-col w-20 lg:w-64 bg-whatsapp-light border-r border-whatsapp-dark/50 p-2 lg:p-4">
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-8 px-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-whatsapp-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 110-6 3 3 0 010 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 10L6 6.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 10L18 6.5" />
        </svg>
        <h1 className="text-xl font-bold hidden lg:block">Praxi</h1>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                activeView === item.id
                  ? 'bg-whatsapp-chat text-white'
                  : 'text-whatsapp-subtle hover:bg-whatsapp-text/10 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="ml-4 hidden lg:block font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-auto hidden lg:block text-center text-whatsapp-subtle text-xs">
        <p>PRAXI-MVP-WHATSAPP</p>
        <p>&copy; 2024</p>
      </div>
    </nav>
  );
};

export default Sidebar;