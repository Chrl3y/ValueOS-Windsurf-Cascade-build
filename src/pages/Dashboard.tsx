import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CheckSquare, FolderOpen, HelpCircle, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Active Tasks',
      value: '24',
      change: '+4 from yesterday',
      icon: CheckSquare,
      color: 'text-blue-600',
    },
    {
      title: 'Projects',
      value: '8',
      change: '2 on track',
      icon: FolderOpen,
      color: 'text-green-600',
    },
    {
      title: 'Open Tickets',
      value: '12',
      change: '-3 resolved today',
      icon: HelpCircle,
      color: 'text-orange-600',
    },
    {
      title: 'Productivity',
      value: '87%',
      change: '+5% this week',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ];

  const recentTasks = [
    { id: '1', title: 'Update Mifos integration', priority: 'high', status: 'in_progress' },
    { id: '2', title: 'Review security policies', priority: 'medium', status: 'todo' },
    { id: '3', title: 'Client onboarding workflow', priority: 'critical', status: 'review' },
  ];

  const upcomingDeadlines = [
    { id: '1', title: 'Q1 Financial Report', dueDate: '2024-02-10', priority: 'high' },
    { id: '2', title: 'System Maintenance', dueDate: '2024-02-12', priority: 'medium' },
    { id: '3', title: 'Team Performance Review', dueDate: '2024-02-15', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your operations today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your most recent task updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={task.priority === 'critical' ? 'destructive' : 
                                task.priority === 'high' ? 'default' : 'secondary'}
                      >
                        {task.priority}
                      </Badge>
                      <Badge variant="outline">{task.status.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks and projects due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-xs text-muted-foreground">Due {item.dueDate}</p>
                  </div>
                  <Badge 
                    variant={item.priority === 'high' ? 'destructive' : 
                            item.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
