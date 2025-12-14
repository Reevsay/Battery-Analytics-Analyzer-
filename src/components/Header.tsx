import React from 'react';
import { Battery, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  batteryImei: string;
}

export function Header({ darkMode, onToggleDarkMode, batteryImei }: HeaderProps) {
  return (
    <header className="relative h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      
      <div className="relative container mx-auto px-6 h-full flex items-center justify-between max-w-[1920px]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Battery className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div className="ml-2">
            <h1 className="text-white text-2xl tracking-tight mb-1">Battery Analytics Dashboard</h1>
            <p className="text-white/90 text-sm">Zenfinity Energy - Real-time Performance Monitoring</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-xs uppercase tracking-wide">IMEI</span>
              <span className="text-white font-mono">{batteryImei}</span>
            </div>
          </div>

          <button
            onClick={onToggleDarkMode}
            className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>

          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"></div>
          </div>
        </div>
      </div>
    </header>
  );
}