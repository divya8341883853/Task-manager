import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProjectList } from './components/Projects/ProjectList';
import { TaskList } from './components/Tasks/TaskList';
import { UserList } from './components/Users/UserList';
import { Settings } from './components/Settings/Settings';

function AppContent() {
  const { auth } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  if (!auth.isAuthenticated) {
    return <LoginForm />;
  }

  const getViewTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard';
      case 'projects': return 'Projects';
      case 'tasks': return 'Tasks';
      case 'users': return 'Users';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectList />;
      case 'tasks':
        return <TaskList />;
      case 'users':
        return <UserList />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={getViewTitle()}
          showCreateButton={activeView === 'projects' || activeView === 'tasks'}
        />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;