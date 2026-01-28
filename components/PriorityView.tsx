
import React from 'react';
import { Star, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { Task, Priority } from '../types';

interface PriorityViewProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
}

const PriorityView: React.FC<PriorityViewProps> = ({ tasks, toggleTask }) => {
  const highPriorityTasks = tasks.filter(t => t.priority === Priority.HIGH && !t.completed);
  const otherTasks = tasks.filter(t => t.priority !== Priority.HIGH || t.completed);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Star className="text-yellow-500 fill-yellow-500" /> Tugas Utama
        </h2>
        <p className="text-slate-400 text-sm">Tugas dengan prioritas tinggi yang harus segera diselesaikan.</p>
      </div>

      {highPriorityTasks.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl text-center flex flex-col items-center gap-4">
          <CheckCircle2 size={48} className="text-green-500/50" strokeWidth={1.5} />
          <p className="text-slate-400 font-medium">Semua tugas prioritas tinggi telah selesai!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {highPriorityTasks.map(task => (
            <div 
              key={task.id}
              className="bg-red-500/5 p-4 rounded-2xl border border-red-500/20 hover:border-red-500/50 transition-all flex items-start gap-4"
            >
              <button 
                onClick={() => toggleTask(task.id)}
                className="mt-1 text-slate-600 hover:text-red-400 transition-colors"
              >
                <Circle size={24} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle size={14} className="text-red-500" />
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Urgent</span>
                </div>
                <h3 className="font-bold text-slate-100">{task.name}</h3>
                <p className="text-xs text-red-300/60 font-medium mt-0.5">{task.subject}</p>
                <div className="mt-3 py-1 px-3 bg-red-500/10 rounded-lg w-fit">
                  <span className="text-[10px] text-red-400 font-bold">DEADLINE: {new Date(task.deadline).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {otherTasks.length > 0 && (
        <div className="space-y-4 opacity-50">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tugas Lainnya</h3>
          <div className="space-y-3">
            {otherTasks.slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center gap-3 text-slate-400 text-sm py-1">
                {task.completed ? <CheckCircle2 size={16} className="text-blue-500" /> : <Circle size={16} />}
                <span className={task.completed ? 'line-through' : ''}>{task.name}</span>
              </div>
            ))}
            {otherTasks.length > 3 && (
              <p className="text-xs text-slate-600 pl-7">+ {otherTasks.length - 3} tugas lainnya</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityView;
