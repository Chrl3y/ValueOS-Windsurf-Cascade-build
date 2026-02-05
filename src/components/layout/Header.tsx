import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center space-x-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks, projects, tickets..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
        </Button>
        
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Last sync:</span>
          <span className="text-sm font-medium">2 min ago</span>
        </div>
      </div>
    </header>
  );
}
