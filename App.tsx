
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ClipboardList, 
  Star, 
  Timer, 
  Settings, 
  Menu, 
  Moon, 
  Sun,
  Plus
} from 'lucide-react';
import { TabType, Task } from './types';
import TaskView from './components/TaskView';
import FocusTimer from './components/FocusTimer';
import PriorityView from './components/PriorityView';
import SettingsView from './components/SettingsView';
import AddTaskModal from './components/AddTaskModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Tugas');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('edubro_theme');
    return saved ? saved === 'dark' : true;
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('edubro_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Timer States (Moved here to persist across tab changes)
  const [focusDuration, setFocusDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    localStorage.setItem('edubro_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('edubro_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Global Timer Effect
  useEffect(() => {
    let interval: number | undefined;

    if (isTimerActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      const message = timerMode === 'focus' ? 'Sesi fokus selesai! Waktunya istirahat.' : 'Waktu istirahat habis! Mari kembali fokus.';
      alert(message);
      
      // Auto reset to default of current mode
      const resetTime = timerMode === 'focus' ? focusDuration : breakDuration;
      setTimeLeft(resetTime);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, timerMode, focusDuration, breakDuration]);

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
        return <TaskView tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} isDarkMode={isDarkMode} />;
      case 'Prioritas':
        return <PriorityView tasks={tasks} toggleTask={toggleTask} isDarkMode={isDarkMode} />;
      case 'Fokus':
        return (
          <FocusTimer 
            isDarkMode={isDarkMode} 
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isActive={isTimerActive}
            setIsActive={setIsTimerActive}
            mode={timerMode}
            setMode={setTimerMode}
            focusDuration={focusDuration}
            setFocusDuration={setFocusDuration}
            breakDuration={breakDuration}
            setBreakDuration={setBreakDuration}
          />
        );
      case 'Pengaturan':
        return <SettingsView isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  const themeClass = isDarkMode ? 'bg-[#0f172a] text-white' : 'bg-slate-50 text-slate-900';

  return (
    <div className={`flex flex-col h-screen max-w-md mx-auto shadow-2xl border-x ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} ${themeClass} relative transition-all duration-500 ease-in-out overflow-hidden`}>
      {/* Header */}
      <header className={`px-6 pt-6 pb-2 flex justify-between items-center z-10 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-slate-50'}`}>
        <button className={`p-2 rounded-lg transition-all active:scale-75 ${isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`}>
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold tracking-tight">EduBro</h1>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-lg transition-all active:scale-75 ${isDarkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-slate-200 text-indigo-600'}`}
        >
          <div className="theme-toggle-icon">
            {isDarkMode ? <Sun size={20} className="animate-in spin-in-90 duration-500" /> : <Moon size={20} className="animate-in spin-in-[-90deg] duration-500" />}
          </div>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        {renderContent()}
      </main>

      {/* FAB - Animated Plus Button */}
      {(activeTab === 'Tugas' || activeTab === 'Prioritas') && (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-24 right-[calc(50%-180px)] p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/40 hover:bg-blue-500 transition-all active:scale-50 group z-20"
        >
          <Plus size={28} className="transition-transform duration-300 group-active:rotate-90 group-hover:scale-110" />
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className={`absolute bottom-0 left-0 right-0 border-t flex justify-around items-center py-3 px-2 z-30 backdrop-blur-md transition-all duration-500 ${
        isDarkMode 
          ? 'bg-[#1e293b]/80 border-slate-800' 
          : 'bg-white/80 border-slate-200'
      }`}>
        <NavButton 
          active={activeTab === 'Tugas'} 
          onClick={() => setActiveTab('Tugas')} 
          icon={<ClipboardList size={22} />} 
          label="Tugas" 
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === 'Prioritas'} 
          onClick={() => setActiveTab('Prioritas')} 
          icon={<Star size={22} />} 
          label="Prioritas" 
          isDarkMode={isDarkMode}
        />
        <NavButton 
          active={activeTab === 'Fokus'} 
          onClick={() => setActiveTab('Fokus')} 
          icon={<Timer size={22} />} 
          label="Fokus" 
          isDarkMode={isDarkMode}
          isTimerActive={isTimerActive}
        />
        <NavButton 
          active={activeTab === 'Pengaturan'} 
          onClick={() => setActiveTab('Pengaturan')} 
          icon={<Settings size={22} />} 
          label="Pengaturan" 
          isDarkMode={isDarkMode}
        />
      </nav>

      {/* Modals */}
      {isModalOpen && (
        <AddTaskModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={addTask} 
          isDarkMode={isDarkMode}
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
  isDarkMode: boolean;
  isTimerActive?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, isDarkMode, isTimerActive }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all active:scale-75 relative ${
      active 
        ? 'text-blue-500' 
        : isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    <div className={`transition-all duration-500 ${active ? 'scale-110' : 'scale-100'}`}>
      {icon}
      {isTimerActive && label === 'Fokus' && (
        <span className="absolute top-0 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm shadow-red-500/50"></span>
      )}
    </div>
    <span className="text-[10px] font-medium transition-colors duration-500">{label}</span>
  </button>
);

export default App;
