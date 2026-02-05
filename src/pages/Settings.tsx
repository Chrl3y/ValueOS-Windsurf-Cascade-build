import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import { 
  Palette, 
  Eye, 
  Zap, 
  Bell,
  Keyboard,
  Monitor,
  Sun,
  Moon
} from 'lucide-react';

export function Settings() {
  const { theme, setThemeMode } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [focusAnimations, setFocusAnimations] = useState(true);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeMode(newTheme);
  };

  const handleReducedMotionChange = (enabled: boolean) => {
    setReducedMotion(enabled);
    if (enabled) {
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    } else {
      document.documentElement.style.removeProperty('--transition-duration');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Customize your ValueOS experience with ADHD-friendly preferences.
        </p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-3 block">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('light')}
                className="flex flex-col items-center space-y-2 h-auto py-4"
              >
                <Sun className="h-6 w-6" />
                <span className="text-sm">Light</span>
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('dark')}
                className="flex flex-col items-center space-y-2 h-auto py-4"
              >
                <Moon className="h-6 w-6" />
                <span className="text-sm">Dark</span>
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('system')}
                className="flex flex-col items-center space-y-2 h-auto py-4"
              >
                <Monitor className="h-6 w-6" />
                <span className="text-sm">System</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Quick Theme Toggle</p>
              <p className="text-sm text-muted-foreground">
                Add theme toggle to header for easy access
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* ADHD-Friendly Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="mr-2 h-5 w-5" />
            ADHD-Friendly Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reduced Motion</p>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions for better focus
              </p>
            </div>
            <Button
              variant={reducedMotion ? 'default' : 'outline'}
              onClick={() => handleReducedMotionChange(!reducedMotion)}
            >
              {reducedMotion ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Focus Animations</p>
              <p className="text-sm text-muted-foreground">
                Enhanced focus indicators for better visibility
              </p>
            </div>
            <Button
              variant={focusAnimations ? 'default' : 'outline'}
              onClick={() => setFocusAnimations(!focusAnimations)}
            >
              {focusAnimations ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">High Contrast</p>
              <p className="text-sm text-muted-foreground">
                Increase color contrast for better readability
              </p>
            </div>
            <Button
              variant={highContrast ? 'default' : 'outline'}
              onClick={() => setHighContrast(!highContrast)}
            >
              {highContrast ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Task Reminders</p>
              <p className="text-sm text-muted-foreground">
                Get notified about upcoming deadlines
              </p>
            </div>
            <Button variant="default">Enabled</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Focus Time Blocks</p>
              <p className="text-sm text-muted-foreground">
                Remind you to take regular breaks
              </p>
            </div>
            <Button variant="default">Enabled</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Summary</p>
              <p className="text-sm text-muted-foreground">
                Receive daily progress reports
              </p>
            </div>
            <Button variant="outline">Disabled</Button>
          </div>
        </CardContent>
      </Card>

      {/* Productivity Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            Productivity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Pomodoro Timer</p>
              <p className="text-sm text-muted-foreground">
                25-minute focus sessions with breaks
              </p>
            </div>
            <Button variant="default">Enabled</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Task Prioritization</p>
              <p className="text-sm text-muted-foreground">
                Auto-sort tasks by urgency and importance
              </p>
            </div>
            <Button variant="default">Enabled</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Time Tracking</p>
              <p className="text-sm text-muted-foreground">
                Automatically track time spent on tasks
              </p>
            </div>
            <Button variant="outline">Disabled</Button>
          </div>
        </CardContent>
      </Card>

      {/* Keyboard Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Keyboard className="mr-2 h-5 w-5" />
            Keyboard Shortcuts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Toggle Theme</span>
              <Badge variant="secondary">Ctrl + Shift + T</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Search</span>
              <Badge variant="secondary">Ctrl + K</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">New Task</span>
              <Badge variant="secondary">Ctrl + N</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Dashboard</span>
              <Badge variant="secondary">Ctrl + D</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
