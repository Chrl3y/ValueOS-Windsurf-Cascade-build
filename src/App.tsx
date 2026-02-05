import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Projects } from './pages/Projects';
import { Timeline } from './pages/Timeline';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/tickets" element={<div>Tickets page coming soon...</div>} />
              <Route path="/automation" element={<div>Automation page coming soon...</div>} />
              <Route path="/team" element={<div>Team page coming soon...</div>} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App
