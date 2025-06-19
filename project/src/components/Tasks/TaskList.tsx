import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Search,
  Calendar,
  User,
  AlertTriangle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { format, isAfter } from 'date-fns';
import { TaskForm } from './TaskForm';
import { TaskCard } from './TaskCard';

export function TaskList() {
  const { tasks, projects, users } = useData();
  const { auth } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const canCreateTask = auth.user?.role === 'admin' || auth.user?.role === 'manager';

  // Filter tasks based on current user role and selected filter
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Role-based filtering
    if (auth.user?.role === 'developer') {
      // Developers can only see tasks assigned to them or created by them
      if (task.assigneeId !== auth.user.id && task.createdById !== auth.user.id) {
        return false;
      }
    }

    // Status filter
    switch (filter) {
      case 'my-tasks':
        return task.assigneeId === auth.user?.id;
      case 'todo':
        return task.status === 'todo';
      case 'in-progress':
        return task.status === 'in-progress';
      case 'done':
        return task.status === 'done';
      case 'overdue':
        return task.status !== 'done' && isAfter(new Date(), task.dueDate);
      default:
        return true;
    }
  });

  // Group tasks by status for kanban view
  const tasksByStatus = {
    todo: filteredTasks.filter(t => t.status === 'todo'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    done: filteredTasks.filter(t => t.status === 'done'),
  };

  const filterOptions = [
    { value: 'all', label: 'All Tasks', icon: <CheckCircle2 size={16} /> },
    { value: 'my-tasks', label: 'My Tasks', icon: <User size={16} /> },
    { value: 'todo', label: 'To Do', icon: <Clock size={16} /> },
    { value: 'in-progress', label: 'In Progress', icon: <AlertTriangle size={16} /> },
    { value: 'done', label: 'Completed', icon: <CheckCircle2 size={16} /> },
    { value: 'overdue', label: 'Overdue', icon: <AlertTriangle size={16} /> },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Tasks</h2>
        {canCreateTask && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            <span>New Task</span>
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === option.value
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option.icon}
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {status.replace('-', ' ')}
              </h3>
              <span className="bg-white text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                {statusTasks.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {statusTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <CheckCircle2 size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">
            {searchTerm 
              ? `No tasks match "${searchTerm}"`
              : filter === 'all' 
                ? 'Create your first task to get started'
                : `No tasks match the selected filter`
            }
          </p>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateForm && (
        <TaskForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
}