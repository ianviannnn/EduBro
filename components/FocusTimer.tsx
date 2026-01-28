
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

const FocusTimer: React.FC = () => {
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
    const RESET_TIME = 5 * 60; // 5 minutes
    setIsActive(false);
    if (mode === 'focus') {
      setFocusDuration(RESET_TIME);
    } else {
      setBreakDuration(RESET_TIME);
    }
    setTimeLeft(RESET_TIME);
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    const newTime = newMode === 'focus' ? focusDuration : breakDuration;
    setTimeLeft(newTime);
  };

  const adjustDuration = (amount: number) => {
    if (isActive) return;
    // Set minimum duration to 5 minutes (300 seconds)
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
      {/* Title Section (Top) */}
      <div className="text-center space-y-2 pt-4">
        <h2 className="text-3xl font-extrabold tracking-tight">Mode {mode === 'focus' ? 'Fokus' : 'Istirahat'}</h2>
        <p className="text-slate-500 text-sm">Sesuaikan waktu dan mulai belajar</p>
      </div>

      {/* Hero Timer Circle (Center) */}
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
              className="text-slate-800/50"
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

          {/* Timer Text Display Perfectly Centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-7xl font-black font-mono tracking-tighter tabular-nums text-white">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Controls Section (Bottom) */}
      <div className="flex flex-col items-center gap-6 w-full pb-10">
        
        {/* Time Adjustment Controls (Moved above Play button) */}
        <div className="flex items-center gap-6 px-4 py-2 bg-slate-900/30 rounded-2xl border border-slate-800/50">
          <button 
            disabled={isActive}
            onClick={() => adjustDuration(-5 * 60)}
            className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 disabled:opacity-30 transition-all active:scale-90"
            aria-label="Kurangi waktu"
          >
            {/* Fix: Removed invalid '消耗' tag */}
            <Minus size={20} className="text-slate-300" />
          </button>
          <div className="flex flex-col items-center min-w-[80px]">
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Set Waktu</span>
            <span className="text-xs font-bold text-blue-400">± 5 Menit</span>
          </div>
          <button 
            disabled={isActive}
            onClick={() => adjustDuration(5 * 60)}
            className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 disabled:opacity-30 transition-all active:scale-90"
            aria-label="Tambah waktu"
          >
            <Plus size={20} className="text-slate-300" />
          </button>
        </div>

        {/* Play/Reset Controls */}
        <div className="flex items-center gap-8">
          <button 
            onClick={resetTimer}
            className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-300 transition-all active:scale-90"
            title="Reset ke 5 Menit"
          >
            <RotateCcw size={24} />
          </button>
          <button 
            onClick={toggleTimer}
            className={`p-6 ${
              isActive 
                ? 'bg-orange-600 hover:bg-orange-500' 
                : (mode === 'focus' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-emerald-600 hover:bg-emerald-500')
            } rounded-3xl shadow-2xl shadow-blue-500/20 transition-all active:scale-90 scale-110`}
          >
            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="bg-slate-900/50 p-1.5 rounded-2xl flex gap-1 border border-slate-800 w-fit">
          <button 
            onClick={() => switchMode('focus')}
            className={`px-8 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'focus' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Fokus
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`px-8 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'break' 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Istirahat
          </button>
        </div>
        
        <p className="text-slate-600 text-[10px] font-medium tracking-widest uppercase mt-2">
          {mode === 'focus' ? `Target Fokus: ${focusDuration/60} Menit` : `Target Istirahat: ${breakDuration/60} Menit`}
        </p>
      </div>
    </div>
  );
};

export default FocusTimer;
