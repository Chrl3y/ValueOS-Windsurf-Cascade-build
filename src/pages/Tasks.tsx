import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Plus, Search, Filter } from 'lucide-react';

export function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const tasks = [
    {
      id: '1',
      title: 'Update Mifos integration documentation',
      description: 'Review and update API documentation for the Mifos banking system integration',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'John Doe',
      dueDate: '2024-02-10',
      project: 'Core Systems',
      tags: ['documentation', 'mifos'],
    },
    {
      id: '2',
      title: 'Implement automated backup system',
      description: 'Set up automated daily backups for all critical databases',
      status: 'todo',
      priority: 'critical',
      assignedTo: 'Jane Smith',
      dueDate: '2024-02-08',
      project: 'Infrastructure',
      tags: ['backup', 'automation'],
    },
    {
      id: '3',
      title: 'Client portal performance optimization',
      description: 'Optimize loading times for the client dashboard',
      status: 'review',
      priority: 'medium',
      assignedTo: 'Mike Johnson',
      dueDate: '2024-02-15',
      project: 'Client Experience',
      tags: ['performance', 'frontend'],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'default';
      case 'in_progress': return 'secondary';
      case 'review': return 'outline';
      case 'todo': return 'outline';
      default: return 'outline';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track all your tasks and assignments.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={getStatusColor(task.status)}>
                    {task.status.replace('_', ' ')}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Due: {task.dueDate}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assigned to:</span>
                  <span className="font-medium">{task.assignedTo}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Project:</span>
                  <span className="font-medium">{task.project}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
