import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  dependencies?: string[];
  assignee?: string;
  type: 'task' | 'milestone' | 'project';
  color?: string;
  subtasks?: GanttTask[];
}

interface GanttChartProps {
  tasks: GanttTask[];
  viewMode?: 'day' | 'week' | 'month';
  onTaskClick?: (task: GanttTask) => void;
  className?: string;
}

export function GanttChart({ 
  tasks, 
  viewMode = 'week', 
  onTaskClick,
  className 
}: GanttChartProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [zoomLevel, setZoomLevel] = useState(1);

  const dateRange = useMemo(() => {
    const start = new Date(currentDate);
    const end = new Date(currentDate);
    
    switch (viewMode) {
      case 'day':
        start.setDate(start.getDate() - 7);
        end.setDate(end.getDate() + 30);
        break;
      case 'week':
        start.setDate(start.getDate() - 14);
        end.setDate(end.getDate() + 60);
        break;
      case 'month':
        start.setMonth(start.getMonth() - 2);
        end.setMonth(end.getMonth() + 6);
        break;
    }
    
    return { start, end };
  }, [currentDate, viewMode]);

  const timeSlots = useMemo(() => {
    const slots = [];
    const current = new Date(dateRange.start);
    
    while (current <= dateRange.end) {
      slots.push(new Date(current));
      
      switch (viewMode) {
        case 'day':
          current.setDate(current.getDate() + 1);
          break;
        case 'week':
          current.setDate(current.getDate() + 7);
          break;
        case 'month':
          current.setMonth(current.getMonth() + 1);
          break;
      }
    }
    
    return slots;
  }, [dateRange, viewMode]);

  const getTaskPosition = (task: GanttTask) => {
    const totalDays = (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24);
    const taskStartDays = Math.max(0, (task.start.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24));
    const taskDuration = (task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24);
    
    const left = (taskStartDays / totalDays) * 100;
    const width = Math.min((taskDuration / totalDays) * 100, 100 - left);
    
    return { left: `${left * zoomLevel}%`, width: `${width * zoomLevel}%` };
  };

  const getTaskColor = (task: GanttTask) => {
    if (task.color) return task.color;
    
    switch (task.type) {
      case 'milestone': return 'bg-purple-500';
      case 'project': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  const formatSlotLabel = (date: Date) => {
    switch (viewMode) {
      case 'day':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'week':
        return `Week ${Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7)}`;
      case 'month':
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      default:
        return '';
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 14 : -14));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in') return Math.min(prev + 0.25, 2);
      return Math.max(prev - 0.25, 0.5);
    });
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Timeline</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-1 ml-4">
              <Button variant="outline" size="sm" onClick={() => handleZoom('out')}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-8 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button variant="outline" size="sm" onClick={() => handleZoom('in')}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* Timeline Header */}
          <div className="flex border-b pb-2 mb-4">
            <div className="w-48 flex-shrink-0 font-medium text-sm">Task</div>
            <div className="flex flex-1 min-w-0">
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex-1 text-center text-xs font-medium p-2 border-r',
                    isToday(slot) && 'bg-blue-50'
                  )}
                >
                  {formatSlotLabel(slot)}
                </div>
              ))}
            </div>
          </div>

          {/* Task Rows */}
          <div className="space-y-2">
            {tasks.map((task) => {
              const position = getTaskPosition(task);
              
              return (
                <div key={task.id} className="flex items-center">
                  <div className="w-48 flex-shrink-0 pr-4">
                    <div className="space-y-1">
                      <div className="font-medium text-sm truncate">{task.name}</div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={task.type === 'milestone' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {task.type}
                        </Badge>
                        {task.assignee && (
                          <span className="text-xs text-muted-foreground">{task.assignee}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 relative h-8 min-w-0">
                    {/* Today indicator */}
                    {isToday(currentDate) && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-blue-500 z-10"
                        style={{
                          left: `${((new Date().getTime() - dateRange.start.getTime()) / (dateRange.end.getTime() - dateRange.start.getTime())) * 100 * zoomLevel}%`
                        }}
                      />
                    )}
                    
                    {/* Task Bar */}
                    <div
                      className={cn(
                        'absolute top-1 h-6 rounded cursor-pointer transition-all duration-200 hover:shadow-md',
                        getTaskColor(task),
                        task.type === 'milestone' && 'w-2 h-2 rounded-full top-3'
                      )}
                      style={task.type !== 'milestone' ? position : {
                        left: position.left,
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                      onClick={() => onTaskClick?.(task)}
                    >
                      {task.type !== 'milestone' && (
                        <div className="h-full bg-white bg-opacity-20 rounded flex items-center px-2">
                          <div 
                            className="h-2 bg-white rounded-full"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Dependencies */}
                    {task.dependencies?.map((depId) => {
                      const depTask = tasks.find(t => t.id === depId);
                      if (!depTask) return null;
                      
                      const depPosition = getTaskPosition(depTask);
                      return (
                        <svg
                          key={depId}
                          className="absolute top-4 pointer-events-none"
                          style={{
                            left: depPosition.left,
                            width: `calc(${position.left} - ${depPosition.left})`,
                            height: '20px'
                          }}
                        >
                          <path
                            d="M 0,10 Q calc(50%),0 calc(100%),10"
                            stroke="#94a3b8"
                            strokeWidth="1"
                            fill="none"
                            markerEnd="url(#arrowhead)"
                          />
                        </svg>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span className="text-xs text-muted-foreground">Project</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span className="text-xs text-muted-foreground">Task</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <span className="text-xs text-muted-foreground">Milestone</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500" />
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
