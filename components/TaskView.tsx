
import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Inbox, Calendar, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Task, Priority } from '../types';

interface TaskViewProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskView: React.FC<TaskViewProps> = ({ tasks, toggleTask, deleteTask }) => {
  const [sortBy, setSortBy] = useState<'deadline' | 'priority'>('deadline');
  const [filterPriority, setFilterPriority] = useState<Priority | 'All'>('All');

  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    
    if (filterPriority !== 'All') {
      result = result.filter(t => t.priority === filterPriority);
    }

    result.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else {
        const priorityOrder = { [Priority.HIGH]: 0, [Priority.MEDIUM]: 1, [Priority.LOW]: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });

    return result;
  }, [tasks, sortBy, filterPriority]);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-64 h-48 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-500 bg-slate-900/30">
          <Inbox size={64} className="mb-4 text-slate-700" strokeWidth={1.5} />
          <h2 className="text-lg font-bold text-slate-200">Anda belum punya tugas</h2>
          <p className="text-sm mt-2 text-slate-500 leading-relaxed">
            Mulai tambahkan tugas baru untuk melihatnya di sini.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Controls */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setSortBy(sortBy === 'deadline' ? 'priority' : 'deadline')}
          className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-full text-xs font-medium flex items-center gap-2 transition-all"
        >
          Sort by {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
        </button>
        <button 
          onClick={() => {
            const priorities: (Priority | 'All')[] = ['All', Priority.LOW, Priority.MEDIUM, Priority.HIGH];
            const currentIndex = priorities.indexOf(filterPriority);
            setFilterPriority(priorities[(currentIndex + 1) % priorities.length]);
          }}
          className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-full text-xs font-medium flex items-center gap-2 transition-all"
        >
          Filter: {filterPriority} <SlidersHorizontal size={14} />
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div 
            key={task.id}
            className={`group bg-[#1e293b] p-4 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all flex items-start gap-4 ${task.completed ? 'opacity-60' : ''}`}
          >
            <button 
              onClick={() => toggleTask(task.id)}
              className={`mt-1 transition-colors ${task.completed ? 'text-blue-500' : 'text-slate-600 hover:text-slate-400'}`}
            >
              {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className={`font-semibold text-slate-100 truncate ${task.completed ? 'line-through decoration-slate-500' : ''}`}>
                  {task.name}
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  task.priority === Priority.HIGH ? 'bg-red-500/10 text-red-400' :
                  task.priority === Priority.MEDIUM ? 'bg-orange-500/10 text-orange-400' :
                  'bg-green-500/10 text-green-400'
                }`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-xs text-blue-400 font-medium mt-0.5">{task.subject}</p>
              {task.description && (
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{task.description}</p>
              )}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Calendar size={12} />
                  <span>{new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-red-500 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskView;
