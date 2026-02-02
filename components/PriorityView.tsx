
import React from 'react';
import { Star, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { Task, Priority } from '../types';

interface PriorityViewProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  isDarkMode: boolean;
}

const PriorityView: React.FC<PriorityViewProps> = ({ tasks, toggleTask, isDarkMode }) => {
  const highPriorityTasks = tasks.filter(t => t.priority === Priority.HIGH && !t.completed);
  const otherTasks = tasks.filter(t => t.priority !== Priority.HIGH || t.completed);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-2">
        <h2 className={`text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          <Star className="text-yellow-500 fill-yellow-500" /> Tugas Utama
        </h2>
        <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-sm`}>
          Tugas prioritas tinggi yang harus segera diselesaikan.
        </p>
      </div>

      {highPriorityTasks.length === 0 ? (
        <div className={`border p-8 rounded-3xl text-center flex flex-col items-center gap-4 ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <CheckCircle2 size={48} className="text-green-500 opacity-40" strokeWidth={1.5} />
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} font-medium`}>Semua tugas utama selesai!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {highPriorityTasks.map(task => (
            <div 
              key={task.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                isDarkMode 
                  ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40' 
                  : 'bg-white border-red-100 shadow-sm hover:border-red-300'
              }`}
            >
              <button 
                onClick={() => toggleTask(task.id)}
                className={`mt-1 transition-colors ${isDarkMode ? 'text-slate-600 hover:text-red-400' : 'text-red-200 hover:text-red-400'}`}
              >
                <Circle size={24} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle size={14} className="text-red-500" />
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Urgent</span>
                </div>
                <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{task.name}</h3>
                <p className="text-xs text-red-500 font-semibold mt-0.5">{task.subject}</p>
                <div className={`mt-3 py-1 px-3 rounded-lg w-fit ${isDarkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
                  <span className="text-[10px] text-red-500 font-bold">
                    DEADLINE: {new Date(task.deadline).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {otherTasks.length > 0 && (
        <div className="space-y-4 opacity-70">
          <h3 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Tugas Lainnya</h3>
          <div className="space-y-3">
            {otherTasks.slice(0, 3).map(task => (
              <div key={task.id} className={`flex items-center gap-3 text-sm py-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {task.completed ? <CheckCircle2 size={16} className="text-blue-500" /> : <Circle size={16} />}
                <span className={task.completed ? 'line-through' : ''}>{task.name}</span>
              </div>
            ))}
            {otherTasks.length > 3 && (
              <p className={`text-xs pl-7 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>+ {otherTasks.length - 3} lainnya</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityView;
