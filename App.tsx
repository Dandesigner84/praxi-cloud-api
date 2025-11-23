
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FlowsPanel from './components/FlowsPanel';
import ControllersPanel from './components/ControllersPanel';
import ServicesPanel from './components/ServicesPanel';
import DbPanel from './components/DbPanel';
import ChatSimulator from './components/ChatSimulator';
import AdminPanel from './components/AdminPanel';
import type { View } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('chat');

  const renderView = () => {
    switch (activeView) {
      case 'flows':
        return <FlowsPanel />;
      case 'controllers':
        return <ControllersPanel />;
      case 'services':
        return <ServicesPanel />;
      case 'db':
        return <DbPanel />;
      case 'admin':
        return <AdminPanel />;
      case 'chat':
      default:
        return <ChatSimulator />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-whatsapp-dark text-whatsapp-text antialiased">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-1 flex-col">
        <Header view={activeView} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
           <div className="bg-whatsapp-dark/80 backdrop-blur-sm rounded-lg h-full">
            {renderView()}
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;