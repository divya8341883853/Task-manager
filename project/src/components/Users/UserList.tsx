import React, { useState } from 'react';
import { Plus, Mail, Calendar, Shield, Edit, Trash2, MoreVertical } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

export function UserList() {
  const { users, tasks } = useData();
  const { auth } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const canManageUsers = auth.user?.role === 'admin';

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'developer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUserStats = (userId: string) => {
    const userTasks = tasks.filter(t => t.assigneeId === userId);
    const completedTasks = userTasks.filter(t => t.status === 'done').length;
    const activeTasks = userTasks.filter(t => t.status !== 'done').length;
    
    return { total: userTasks.length, completed: completedTasks, active: activeTasks };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Team Members</h2>
        {canManageUsers && (
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            <span>Add User</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => {
          const stats = getUserStats(user.id);
          
          return (
            <div key={user.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
                
                {canManageUsers && (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === user.id ? null : user.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {dropdownOpen === user.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Edit size={16} />
                          <span>Edit User</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                          <Trash2 size={16} />
                          <span>Remove User</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>Joined {format(user.createdAt, 'MMM dd, yyyy')}</span>
                </div>

                <div className="border-t pt-3 mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Task Statistics</h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{stats.total}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-blue-600">{stats.active}</div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-600">{stats.completed}</div>
                      <div className="text-xs text-gray-500">Done</div>
                    </div>
                  </div>
                </div>

                {stats.total > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Completion Rate</span>
                      <span>{Math.round((stats.completed / stats.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}