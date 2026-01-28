
import React from 'react';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const SettingsView: React.FC = () => {
  const SettingItem = ({ icon, label, sublabel }: { icon: React.ReactNode, label: string, sublabel?: string }) => (
    <button className="w-full flex items-center justify-between p-4 bg-[#1e293b] rounded-2xl border border-slate-800 hover:border-slate-700 transition-all active:scale-[0.98]">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-slate-800 rounded-xl text-slate-300">
          {icon}
        </div>
        <div className="text-left">
          <p className="font-semibold text-slate-100">{label}</p>
          {sublabel && <p className="text-xs text-slate-500">{sublabel}</p>}
        </div>
      </div>
      <ChevronRight size={20} className="text-slate-600" />
    </button>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 pb-12">
      <div className="flex items-center gap-6 p-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-1">
          <img 
            src="https://picsum.photos/seed/user123/200" 
            alt="Profile" 
            className="w-full h-full rounded-full border-4 border-[#0f172a] object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">EduBro User</h2>
          <p className="text-sm text-slate-500">Pelajar Menengah Atas</p>
          <button className="mt-2 text-xs font-bold text-blue-500 hover:underline">Edit Profil</button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest px-2">Akun & Aplikasi</h3>
        <SettingItem icon={<User size={20} />} label="Informasi Pribadi" sublabel="Email, Tanggal Lahir, Sekolah" />
        <SettingItem icon={<Bell size={20} />} label="Notifikasi" sublabel="Atur pengingat tugas & timer" />
        <SettingItem icon={<Shield size={20} />} label="Keamanan" sublabel="Kata sandi & Autentikasi" />
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest px-2">Dukungan</h3>
        <SettingItem icon={<HelpCircle size={20} />} label="Pusat Bantuan" />
        <SettingItem icon={<LogOut size={20} />} label="Keluar" />
      </div>

      <div className="text-center pt-8">
        <p className="text-slate-700 text-xs">EduBro v1.0.4 • Made with ❤️ for Students</p>
      </div>
    </div>
  );
};

export default SettingsView;
