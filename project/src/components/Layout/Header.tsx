import React from 'react';
import { Bell, Search, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  onCreateNew?: () => void;
  showCreateButton?: boolean;
}

export function Header({ title, onCreateNew, showCreateButton = false }: HeaderProps) {
  const { auth, switchUser } = useAuth();

  const handleUserSwitch = (userId: string) => {
    switchUser(userId);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Demo user switcher */}
          <select
            value={auth.user?.id || ''}
            onChange={(e) => handleUserSwitch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-yellow-50 border-yellow-300"
          >
            <option value="1">Admin (Divya)</option>
            <option value="2">Manager (Mike)</option>
            <option value="3">Developer (Alex)</option>
          </select>

          {/* Create Button */}
          {showCreateButton && onCreateNew && (
            <button
              onClick={onCreateNew}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              <span>Create New</span>
            </button>
          )}

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}