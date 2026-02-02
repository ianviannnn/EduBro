
import React from 'react';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

interface SettingsViewProps {
  isDarkMode: boolean;
}

const SettingsView: React.FC<SettingsViewProps> = ({ isDarkMode }) => {
  const SettingItem = ({ icon, label, sublabel }: { icon: React.ReactNode, label: string, sublabel?: string }) => (
    <button className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${
      isDarkMode 
        ? 'bg-[#1e293b] border-slate-800 hover:border-slate-700' 
        : 'bg-white border-slate-100 shadow-sm hover:border-slate-200'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
          {icon}
        </div>
        <div className="text-left">
          <p className={`font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{label}</p>
          {sublabel && <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{sublabel}</p>}
        </div>
      </div>
      <ChevronRight size={20} className={isDarkMode ? 'text-slate-600' : 'text-slate-300'} />
    </button>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 pb-12">
      <div className="flex items-center gap-6 p-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-1">
          <img 
            src="https://picsum.photos/seed/user123/200" 
            alt="Profile" 
            className={`w-full h-full rounded-full border-4 object-cover ${isDarkMode ? 'border-[#0f172a]' : 'border-slate-50'}`}
          />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>EduBro User</h2>
          <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Pelajar Menengah Atas</p>
          <button className="mt-2 text-xs font-bold text-blue-500 hover:underline">Edit Profil</button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className={`text-xs font-bold uppercase tracking-widest px-2 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Akun & Aplikasi</h3>
        <SettingItem icon={<User size={20} />} label="Informasi Pribadi" sublabel="Email, Sekolah" />
        <SettingItem icon={<Bell size={20} />} label="Notifikasi" sublabel="Atur pengingat tugas" />
        <SettingItem icon={<Shield size={20} />} label="Keamanan" sublabel="Kata sandi & Autentikasi" />
      </div>

      <div className="space-y-3">
        <h3 className={`text-xs font-bold uppercase tracking-widest px-2 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Dukungan</h3>
        <SettingItem icon={<HelpCircle size={20} />} label="Pusat Bantuan" />
        <SettingItem icon={<LogOut size={20} />} label="Keluar" />
      </div>

      <div className="text-center pt-8">
        <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}`}>
          EduBro v1.0.5 • Build with ❤️
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
