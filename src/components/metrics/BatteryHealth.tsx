import React from 'react';
import { Battery, Activity } from 'lucide-react';

interface BatteryHealthProps {
  soc: {
    current: number;
    min: number;
    max: number;
  };
  soh: number;
}

export function BatteryHealth({ soc, soh }: BatteryHealthProps) {
  const getSOHColor = (value: number) => {
    if (value >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (value >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSOHBgColor = (value: number) => {
    if (value >= 80) return 'from-emerald-500 to-emerald-600';
    if (value >= 60) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };

  const socPercentage = soc.current;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (socPercentage / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <Battery className="w-5 h-5 text-emerald-500" />
        Battery Health
      </h3>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg className="transform -rotate-90 w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-gray-200 dark:text-slate-700"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#socGradient)"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="socGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-3xl dark:text-white">{socPercentage.toFixed(0)}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">SOC</div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className={`p-5 rounded-xl bg-gradient-to-br ${getSOHBgColor(soh)}`}>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              <span className="text-sm">State of Health</span>
            </div>
            <span className="text-2xl">{soh.toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[70px]">Min SOC</span>
            <div className="flex-1 h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${soc.min}%` }}
              ></div>
            </div>
            <span className="text-sm dark:text-white w-14 text-right">{soc.min.toFixed(0)}%</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[70px]">Max SOC</span>
            <div className="flex-1 h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${soc.max}%` }}
              ></div>
            </div>
            <span className="text-sm dark:text-white w-14 text-right">{soc.max.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}