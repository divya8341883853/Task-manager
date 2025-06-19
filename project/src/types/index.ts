export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'developer';
  avatar?: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate: Date;
  endDate: Date;
  managerId: string;
  teamMembers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  projectId: string;
  assigneeId?: string;
  createdById: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
}

export interface AuthUser {
  user: User | null;
  isAuthenticated: boolean;
}