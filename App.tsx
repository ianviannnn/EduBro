
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ClipboardList, 
  Star, 
  Timer, 
  Settings, 
  Menu, 
  Moon, 
  Plus,
  Inbox
} from 'lucide-react';
import { TabType, Task } from './types';
import TaskView from './components/TaskView';
import FocusTimer from './components/FocusTimer';
import PriorityView from './components/PriorityView';
import SettingsView from './components/SettingsView';
import AddTaskModal from './components/AddTaskModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Tugas');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('edubro_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('edubro_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
    setIsModalOpen(false);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Tugas':
        return <TaskView tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />;
      case 'Prioritas':
        return <PriorityView tasks={tasks} toggleTask={toggleTask} />;
      case 'Fokus':
        return <FocusTimer />;
      case 'Pengaturan':
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto shadow-2xl border-x border-slate-800 bg-[#0f172a] relative overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-[#0f172a] z-10">
        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <Menu size={20} className="text-slate-400" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">EduBro</h1>
        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <Moon size={20} className="text-slate-400" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        {renderContent()}
      </main>

      {/* FAB - Only visible on Tugas and Prioritas tabs */}
      {(activeTab === 'Tugas' || activeTab === 'Prioritas') && (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-24 right-[calc(50%-180px)] md:right-[calc(50%-180px)] p-4 bg-blue-600 rounded-full shadow-lg hover:bg-blue-500 transition-all active:scale-95 z-20"
        >
          <Plus size={28} />
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-[#1e293b]/80 backdrop-blur-md border-t border-slate-800 flex justify-around items-center py-3 px-2 z-30">
        <NavButton 
          active={activeTab === 'Tugas'} 
          onClick={() => setActiveTab('Tugas')} 
          icon={<ClipboardList size={22} />} 
          label="Tugas" 
        />
        <NavButton 
          active={activeTab === 'Prioritas'} 
          onClick={() => setActiveTab('Prioritas')} 
          icon={<Star size={22} />} 
          label="Prioritas" 
        />
        <NavButton 
          active={activeTab === 'Fokus'} 
          onClick={() => setActiveTab('Fokus')} 
          icon={<Timer size={22} />} 
          label="Fokus" 
        />
        <NavButton 
          active={activeTab === 'Pengaturan'} 
          onClick={() => setActiveTab('Pengaturan')} 
          icon={<Settings size={22} />} 
          label="Pengaturan" 
        />
      </nav>

      {/* Modals */}
      {isModalOpen && (
        <AddTaskModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={addTask} 
        />
      )}
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default App;
