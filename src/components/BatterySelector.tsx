import React from 'react';
import { Battery, Activity, Clock } from 'lucide-react';
import { type Battery as BatteryType } from '../data/mockData';

interface BatterySelectorProps {
  batteries: BatteryType[];
  selectedBatteryId: string;
  onBatteryChange: (batteryId: string) => void;
}

export function BatterySelector({ batteries, selectedBatteryId, onBatteryChange }: BatterySelectorProps) {
  const selectedBattery = batteries.find(b => b.id === selectedBatteryId);
  
  const totalCycles = selectedBattery?.cycles.length || 0;
  const avgHealth = selectedBattery ? 
    selectedBattery.cycles.reduce((sum, c) => sum + c.soh, 0) / selectedBattery.cycles.length : 0;
  const lastUpdated = selectedBattery?.cycles[selectedBattery.cycles.length - 1]?.endTime;

  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
        <label className="block text-lg mb-4 dark:text-white">Select Battery</label>
        <select
          value={selectedBatteryId}
          onChange={(e) => onBatteryChange(e.target.value)}
          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white text-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors cursor-pointer"
        >
          {batteries.map(battery => (
            <option key={battery.id} value={battery.id}>
              IMEI: {battery.imei} ({battery.cycles.length} cycles)
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <MetricCard
          icon={<Activity className="w-8 h-8" />}
          label="Total Cycles"
          value={totalCycles.toString()}
          description="Charge/discharge cycles"
          gradient="from-blue-500 to-blue-600"
        />
        <MetricCard
          icon={<Battery className="w-8 h-8" />}
          label="Average Health"
          value={`${avgHealth.toFixed(1)}%`}
          description="State of health"
          gradient="from-emerald-500 to-emerald-600"
        />
        <MetricCard
          icon={<Clock className="w-8 h-8" />}
          label="Last Updated"
          value={lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'N/A'}
          description={lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : ''}
          gradient="from-purple-500 to-purple-600"
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  gradient: string;
}

function MetricCard({ icon, label, value, description, gradient }: MetricCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="relative">
        <div className="mb-4 opacity-90">
          {icon}
        </div>
        <div className="text-sm opacity-90 mb-2 uppercase tracking-wide">{label}</div>
        <div className="text-4xl mb-2">{value}</div>
        <div className="text-sm opacity-80 mt-1">{description}</div>
      </div>
    </div>
  );
}