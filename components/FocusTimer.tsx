
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

interface FocusTimerProps {
  isDarkMode: boolean;
}

const FocusTimer: React.FC<FocusTimerProps> = ({ isDarkMode }) => {
  const [focusDuration, setFocusDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(mode === 'focus' ? focusDuration : breakDuration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const message = mode === 'focus' ? 'Sesi fokus selesai! Waktunya istirahat.' : 'Waktu istirahat habis! Mari kembali fokus.';
      alert(message);
      resetTimer();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    const DEFAULT_TIME = mode === 'focus' ? 25 * 60 : 5 * 60;
    setIsActive(false);
    setTimeLeft(DEFAULT_TIME);
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    const newTime = newMode === 'focus' ? focusDuration : breakDuration;
    setTimeLeft(newTime);
  };

  const adjustDuration = (amount: number) => {
    if (isActive) return;
    const MIN_DURATION = 300; 
    
    if (mode === 'focus') {
      const newDur = Math.max(MIN_DURATION, focusDuration + amount);
      setFocusDuration(newDur);
      setTimeLeft(newDur);
    } else {
      const newDur = Math.max(MIN_DURATION, breakDuration + amount);
      setBreakDuration(newDur);
      setTimeLeft(newDur);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTotalTime = mode === 'focus' ? focusDuration : breakDuration;
  const percentage = (timeLeft / currentTotalTime) * 100;
  const strokeDasharray = 2 * Math.PI * 110;
  const strokeDashoffset = strokeDasharray * (1 - percentage / 100);

  return (
    <div className="h-full flex flex-col items-center animate-in zoom-in duration-500">
      <div className="text-center space-y-2 pt-4">
        <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          Mode {mode === 'focus' ? 'Fokus' : 'Istirahat'}
        </h2>
        <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} text-sm`}>
          Mulai belajar tanpa gangguan
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center w-full min-h-[350px]">
        <div className="relative flex items-center justify-center">
          <svg className="w-80 h-80 transform -rotate-90">
            <circle
              cx="160"
              cy="160"
              r="110"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className={isDarkMode ? 'text-slate-800/50' : 'text-slate-200'}
            />
            <circle
              cx="160"
              cy="160"
              r="110"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              style={{ 
                strokeDashoffset,
                transition: 'stroke-dashoffset 1s linear'
              }}
              className={`${mode === 'focus' ? 'text-blue-500' : 'text-emerald-500'} stroke-round`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-7xl font-black font-mono tracking-tighter tabular-nums transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'} ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 w-full pb-10">
        <div className={`flex items-center gap-6 px-4 py-2 rounded-2xl border transition-colors ${
          isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <button 
            disabled={isActive}
            onClick={() => adjustDuration(-5 * 60)}
            className={`p-2 rounded-xl transition-all active:scale-50 disabled:opacity-30 ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <Minus size={20} />
          </button>
          <div className="flex flex-col items-center min-w-[80px]">
            <span className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Waktu</span>
            <span className="text-xs font-bold text-blue-500">± 5 Menit</span>
          </div>
          <button 
            disabled={isActive}
            onClick={() => adjustDuration(5 * 60)}
            className={`p-2 rounded-xl transition-all active:scale-50 disabled:opacity-30 ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={resetTimer}
            className={`p-4 rounded-2xl transition-all active:scale-75 active:rotate-[-45deg] ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-white border border-slate-200 text-slate-500 shadow-sm'
            }`}
          >
            <RotateCcw size={24} />
          </button>
          <button 
            onClick={toggleTimer}
            className={`p-6 text-white rounded-3xl shadow-2xl transition-all active:scale-75 scale-110 ${
              isActive 
                ? 'bg-orange-600 shadow-orange-500/20' 
                : (mode === 'focus' ? 'bg-blue-600 shadow-blue-500/20' : 'bg-emerald-600 shadow-emerald-500/20')
            }`}
          >
            <div className="transition-transform duration-200">
              {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </div>
          </button>
        </div>

        <div className={`p-1.5 rounded-2xl flex gap-1 border transition-colors ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-200/50 border-slate-200'
        }`}>
          <button 
            onClick={() => switchMode('focus')}
            className={`px-8 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              mode === 'focus' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Fokus
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`px-8 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              mode === 'break' 
                ? 'bg-emerald-600 text-white shadow-lg' 
                : isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Istirahat
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
