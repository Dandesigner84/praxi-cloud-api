
import React from 'react';
import type { View } from '../types';

interface HeaderProps {
  view: View;
}

const viewTitles: Record<View, string> = {
  chat: 'WhatsApp Chat Simulator',
  flows: 'Conversation Flows',
  controllers: 'Logic Controllers',
  services: 'Connected Services',
  db: 'Database Viewer',
  admin: 'Admin Dashboard',
};

const Header: React.FC<HeaderProps> = ({ view }) => {
  return (
    <header className="bg-whatsapp-light p-4 shadow-md flex items-center h-16 border-b border-whatsapp-dark/50">
      <h2 className="text-xl font-semibold text-whatsapp-text capitalize">{viewTitles[view]}</h2>
    </header>
  );
};

export default Header;
