
import React, { useState } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { Priority, Task } from '../types';
import { SUBJECTS } from '../constants';

interface AddTaskModalProps {
  onClose: () => void;
  onSave: (task: Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onSave }) => {
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#1e293b] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 border-t sm:border border-slate-800 animate-in slide-in-from-bottom-full duration-300">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Tambah Tugas Baru</h2>
            <p className="text-sm text-slate-400 mt-1">Isi detail tugas baru Anda di bawah ini.</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-lg text-slate-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 pb-8 sm:pb-0">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Nama Tugas</label>
            <input
              type="text"
              required
              placeholder="Contoh: Mengerjakan Latihan Aljabar"
              className="w-full bg-[#0f172a] border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Mata Pelajaran</label>
              <select
                required
                className="w-full bg-[#0f172a] border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all appearance-none text-slate-300"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="" disabled>Pilih mata pelajaran</option>
                {SUBJECTS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Deadline</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  className="w-full bg-[#0f172a] border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all text-slate-300"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Deskripsi (Opsional)</label>
            <textarea
              placeholder="Detail tugas, catatan, dll."
              className="w-full bg-[#0f172a] border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all min-h-[100px] resize-none placeholder:text-slate-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Prioritas</label>
            <div className="flex gap-4">
              {[Priority.LOW, Priority.MEDIUM, Priority.HIGH].map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="priority"
                      className="peer sr-only"
                      checked={priority === p}
                      onChange={() => setPriority(p)}
                    />
                    <div className={`w-5 h-5 border-2 rounded-full transition-all peer-checked:border-blue-500 ${
                      priority === p ? 'border-blue-500' : 'border-slate-700'
                    }`}></div>
                    <div className={`absolute w-2.5 h-2.5 bg-blue-500 rounded-full scale-0 transition-transform peer-checked:scale-100`}></div>
                  </div>
                  <span className={`text-sm transition-colors ${priority === p ? 'text-slate-100 font-semibold' : 'text-slate-500'}`}>
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
              className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all active:scale-95"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
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
