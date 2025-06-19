import React from 'react';
import { 
  FolderOpen, 
  CheckSquare, 
  Users, 
  Clock,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { isAfter, format } from 'date-fns';

export function Dashboard() {
  const { projects, tasks, users } = useData();
  const { auth } = useAuth();

  // Calculate metrics
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const overdueTasks = tasks.filter(t => 
    t.status !== 'done' && isAfter(new Date(), t.dueDate)
  ).length;

  const myTasks = tasks.filter(t => t.assigneeId === auth.user?.id);
  const myActiveTasks = myTasks.filter(t => t.status !== 'done').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: <FolderOpen className="text-blue-600" size={24} />,
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: <CheckSquare className="text-green-600" size={24} />,
      color: 'bg-green-50 border-green-200',
    },
    {
      title: 'Team Members',
      value: users.length,
      icon: <Users className="text-purple-600" size={24} />,
      color: 'bg-purple-50 border-purple-200',
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks,
      icon: <AlertTriangle className="text-red-600" size={24} />,
      color: 'bg-red-50 border-red-200',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {auth.user?.name}!
        </h2>
        <p className="text-blue-100">
          You have {myActiveTasks} active tasks to work on today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white border rounded-xl p-6 ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className="p-3 rounded-lg bg-white">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Progress */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Project Progress</h3>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => {
              const projectTasks = tasks.filter(t => t.projectId === project.id);
              const completedProjectTasks = projectTasks.filter(t => t.status === 'done');
              const progress = projectTasks.length > 0 
                ? Math.round((completedProjectTasks.length / projectTasks.length) * 100) 
                : 0;

              return (
                <div key={project.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{project.name}</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
            <Clock className="text-blue-500" size={20} />
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => {
              const isOverdue = task.status !== 'done' && isAfter(new Date(), task.dueDate);
              const assignee = users.find(u => u.id === task.assigneeId);

              return (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                    <p className="text-xs text-gray-500">
                      Assigned to {assignee?.name || 'Unassigned'} • Due {format(task.dueDate, 'MMM dd')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isOverdue && <AlertTriangle className="text-red-500" size={16} />}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      task.status === 'done' 
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overall Completion Rate */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Task Completion</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Completed: {completedTasks} / {totalTasks}</span>
              <span>{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}