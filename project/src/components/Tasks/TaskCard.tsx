import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  AlertTriangle, 
  Flag,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { format, isAfter } from 'date-fns';
import { Task } from '../../types';
import { TaskForm } from './TaskForm';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { projects, users, updateTask, deleteTask } = useData();
  const { auth } = useAuth();
  const [showEditForm, setShowEditForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const project = projects.find(p => p.id === task.projectId);
  const assignee = users.find(u => u.id === task.assigneeId);
  const isOverdue = task.status !== 'done' && isAfter(new Date(), task.dueDate);
  
  const canEdit = auth.user?.role === 'admin' || 
                  auth.user?.role === 'manager' || 
                  task.assigneeId === auth.user?.id;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">{task.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
          </div>
          {canEdit && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <MoreVertical size={16} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setShowEditForm(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{project?.name || 'No Project'}</span>
            <Flag className={`${getPriorityColor(task.priority)}`} size={12} />
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Calendar size={12} />
            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
              {format(task.dueDate, 'MMM dd')}
            </span>
            {isOverdue && <AlertTriangle className="text-red-500" size={12} />}
          </div>

          {assignee && (
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <User size={12} />
              <span>{assignee.name}</span>
            </div>
          )}
        </div>

        {/* Status Selector */}
        <div className="flex items-center justify-between">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
            disabled={!canEdit}
            className={`text-xs px-2 py-1 border rounded-full font-medium cursor-pointer ${
              getStatusColor(task.status)
            } ${!canEdit ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          
          {assignee && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {assignee.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {showEditForm && (
        <TaskForm
          taskId={task.id}
          onClose={() => setShowEditForm(false)}
          onSuccess={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}