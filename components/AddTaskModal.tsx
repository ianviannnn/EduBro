
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Priority, Task } from '../types';
import { SUBJECTS } from '../constants';

interface AddTaskModalProps {
  onClose: () => void;
  onSave: (task: Task) => void;
  isDarkMode: boolean;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onSave, isDarkMode }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.LOW);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject || !deadline) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      subject,
      deadline,
      description,
      priority,
      completed: false,
      createdAt: Date.now()
    };
    onSave(newTask);
  };

  const inputBg = isDarkMode ? 'bg-[#0f172a]' : 'bg-slate-50';
  const inputBorder = isDarkMode ? 'border-slate-800 focus:border-blue-500' : 'border-slate-200 focus:border-blue-500';
  const labelColor = isDarkMode ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-300">
      <div className={`w-full max-w-md rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 border-t sm:border animate-in slide-in-from-bottom-full duration-500 ease-out ${
        isDarkMode ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Tambah Tugas</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Lengkapi detail tugas baru.</p>
          </div>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full transition-all active:rotate-90 active:scale-50 ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 pb-8 sm:pb-0">
          <div className="space-y-2">
            <label className={`text-sm font-semibold ${labelColor}`}>Nama Tugas</label>
            <input
              type="text"
              required
              placeholder="Contoh: Latihan Matematika"
              className={`w-full border-2 rounded-xl px-4 py-3 outline-none transition-all ${inputBg} ${inputBorder} ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`text-sm font-semibold ${labelColor}`}>Mapel</label>
              <select
                required
                className={`w-full border-2 rounded-xl px-4 py-3 outline-none transition-all appearance-none ${inputBg} ${inputBorder} ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="" disabled>Pilih mapel</option>
                {SUBJECTS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className={`text-sm font-semibold ${labelColor}`}>Deadline</label>
              <input
                type="date"
                required
                className={`w-full border-2 rounded-xl px-4 py-3 outline-none transition-all ${inputBg} ${inputBorder} ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-semibold ${labelColor}`}>Deskripsi</label>
            <textarea
              placeholder="Detail tugas..."
              className={`w-full border-2 rounded-xl px-4 py-3 outline-none transition-all min-h-[100px] resize-none ${inputBg} ${inputBorder} ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className={`text-sm font-semibold ${labelColor}`}>Prioritas</label>
            <div className="flex gap-4">
              {[Priority.LOW, Priority.MEDIUM, Priority.HIGH].map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer group active:scale-90 transition-transform duration-200">
                  <input
                    type="radio"
                    name="priority"
                    className="sr-only"
                    checked={priority === p}
                    onChange={() => setPriority(p)}
                  />
                  <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${
                    priority === p ? 'border-blue-500 bg-blue-500/10' : isDarkMode ? 'border-slate-700' : 'border-slate-300'
                  }`}>
                    {priority === p && <div className="w-2 bg-blue-500 h-2 rounded-full animate-in zoom-in"></div>}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${priority === p ? (isDarkMode ? 'text-white' : 'text-slate-800') : 'text-slate-400'}`}>
                    {p}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all active:scale-95 ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white hover:bg-blue-500 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
