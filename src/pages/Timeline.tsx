import { useState } from 'react';
import { GanttChart, type GanttTask } from '../components/ui/GanttChart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Plus, Filter } from 'lucide-react';

export function Timeline() {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null);

  // Sample data for demonstration
  const sampleTasks: GanttTask[] = [
    {
      id: '1',
      name: 'Q1 2024 Planning',
      start: new Date('2024-01-01'),
      end: new Date('2024-01-15'),
      progress: 100,
      type: 'project',
      assignee: 'John Doe',
      color: 'bg-blue-500',
    },
    {
      id: '2',
      name: 'System Architecture Review',
      start: new Date('2024-01-10'),
      end: new Date('2024-01-20'),
      progress: 75,
      type: 'task',
      assignee: 'Jane Smith',
      dependencies: ['1'],
    },
    {
      id: '3',
      name: 'Database Migration',
      start: new Date('2024-01-15'),
      end: new Date('2024-02-01'),
      progress: 40,
      type: 'task',
      assignee: 'Mike Johnson',
      dependencies: ['2'],
    },
    {
      id: '4',
      name: 'API Development',
      start: new Date('2024-01-20'),
      end: new Date('2024-02-10'),
      progress: 25,
      type: 'task',
      assignee: 'Sarah Wilson',
      dependencies: ['2'],
    },
    {
      id: '5',
      name: 'Security Audit Complete',
      start: new Date('2024-02-05'),
      end: new Date('2024-02-05'),
      progress: 0,
      type: 'milestone',
      assignee: 'Security Team',
      dependencies: ['3', '4'],
    },
    {
      id: '6',
      name: 'User Testing Phase',
      start: new Date('2024-02-10'),
      end: new Date('2024-02-25'),
      progress: 0,
      type: 'task',
      assignee: 'QA Team',
      dependencies: ['5'],
    },
    {
      id: '7',
      name: 'Production Deployment',
      start: new Date('2024-02-25'),
      end: new Date('2024-02-28'),
      progress: 0,
      type: 'milestone',
      assignee: 'DevOps Team',
      dependencies: ['6'],
    },
    {
      id: '8',
      name: 'Q2 2024 Development',
      start: new Date('2024-03-01'),
      end: new Date('2024-05-31'),
      progress: 0,
      type: 'project',
      assignee: 'John Doe',
      dependencies: ['7'],
      color: 'bg-green-500',
    },
  ];

  const handleTaskClick = (task: GanttTask) => {
    setSelectedTask(task);
  };

  const getTaskStats = () => {
    const total = sampleTasks.length;
    const completed = sampleTasks.filter(t => t.progress === 100).length;
    const inProgress = sampleTasks.filter(t => t.progress > 0 && t.progress < 100).length;
    const notStarted = sampleTasks.filter(t => t.progress === 0).length;
    
    return { total, completed, inProgress, notStarted };
  };

  const stats = getTaskStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Timeline</h1>
          <p className="text-muted-foreground">
            Visualize project schedules, dependencies, and milestones.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Not Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.notStarted}</div>
          </CardContent>
        </Card>
      </div>

      {/* View Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Timeline View</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'day' | 'week' | 'month')}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="day">Daily View</option>
                <option value="week">Weekly View</option>
                <option value="month">Monthly View</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <GanttChart
            tasks={sampleTasks}
            viewMode={viewMode}
            onTaskClick={handleTaskClick}
          />
        </CardContent>
      </Card>

      {/* Task Details */}
      {selectedTask && (
        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Task Name:</span>
                  <p className="font-medium">{selectedTask.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Type:</span>
                  <div className="mt-1">
                    <Badge variant={selectedTask.type === 'milestone' ? 'destructive' : 'secondary'}>
                      {selectedTask.type}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Assignee:</span>
                  <p className="font-medium">{selectedTask.assignee || 'Unassigned'}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Start Date:</span>
                  <p className="font-medium">{selectedTask.start.toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">End Date:</span>
                  <p className="font-medium">{selectedTask.end.toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Progress:</span>
                  <div className="mt-1">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${selectedTask.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{selectedTask.progress}%</p>
                  </div>
                </div>
              </div>
            </div>
            {selectedTask.dependencies && selectedTask.dependencies.length > 0 && (
              <div className="mt-4">
                <span className="text-sm font-medium text-muted-foreground">Dependencies:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTask.dependencies.map((depId) => {
                    const depTask = sampleTasks.find(t => t.id === depId);
                    return depTask ? (
                      <Badge key={depId} variant="outline" className="text-xs">
                        {depTask.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
