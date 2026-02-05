export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'viewer';
  avatar?: string;
  isActive: boolean;
}

export interface Project extends BaseEntity {
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string[];
  dueDate?: string;
  tags: string[];
  progress: number; // 0-100
}

export interface Task extends BaseEntity {
  title: string;
  description: string;
  projectId?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string[];
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  dependencies: string[]; // task IDs
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Ticket extends BaseEntity {
  title: string;
  description: string;
  category: 'hardware' | 'software' | 'network' | 'account' | 'other';
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  requestedBy: string;
  assignedTo?: string;
  resolution?: string;
  resolvedAt?: string;
  attachments: string[];
}

export interface AutomationRule extends BaseEntity {
  name: string;
  description: string;
  trigger: {
    type: 'ticket_created' | 'task_assigned' | 'project_overdue' | 'custom';
    conditions: Record<string, any>;
  };
  actions: {
    type: 'assign_task' | 'send_notification' | 'create_ticket' | 'update_status';
    parameters: Record<string, any>;
  }[];
  isActive: boolean;
}

export interface DashboardWidget {
  id: string;
  type: 'tasks_summary' | 'projects_progress' | 'tickets_stats' | 'recent_activity';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: Record<string, any>;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface FilterOptions {
  status?: string[];
  priority?: string[];
  assignedTo?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}
