import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Task, User } from '../types';

interface DataContextType {
  projects: Project[];
  tasks: Task[];
  users: User[];
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Divya',
    email: 'divya@company.com',
    role: 'admin',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    role: 'manager',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Alex Rivera',
    email: 'alex@company.com',
    role: 'developer',
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@company.com',
    role: 'developer',
    createdAt: new Date(),
  },
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Build a modern e-commerce platform with React and Node.js',
    status: 'active',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-06-30'),
    managerId: '2',
    teamMembers: ['2', '3', '4'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Create a cross-platform mobile application',
    status: 'planning',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-08-30'),
    managerId: '2',
    teamMembers: ['3'],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(),
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Set up project structure',
    description: 'Initialize the project with proper folder structure and dependencies',
    status: 'done',
    priority: 'high',
    projectId: '1',
    assigneeId: '3',
    createdById: '2',
    dueDate: new Date('2024-01-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    comments: [],
  },
  {
    id: '2',
    title: 'Design user authentication',
    description: 'Create login/register forms and authentication flow',
    status: 'in-progress',
    priority: 'high',
    projectId: '1',
    assigneeId: '3',
    createdById: '2',
    dueDate: new Date('2024-01-30'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date(),
    comments: [],
  },
  {
    id: '3',
    title: 'Implement product catalog',
    description: 'Build the product listing and detail pages',
    status: 'todo',
    priority: 'medium',
    projectId: '1',
    assigneeId: '4',
    createdById: '2',
    dueDate: new Date('2024-02-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    comments: [],
  },
  {
    id: '4',
    title: 'Setup development environment',
    description: 'Configure development tools and environment',
    status: 'todo',
    priority: 'high',
    projectId: '2',
    assigneeId: '3',
    createdById: '2',
    dueDate: new Date('2024-03-10'),
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date(),
    comments: [],
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setTasks(prev => prev.filter(t => t.projectId !== id));
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <DataContext.Provider value={{
      projects,
      tasks,
      users,
      createProject,
      updateProject,
      deleteProject,
      createTask,
      updateTask,
      deleteTask,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}