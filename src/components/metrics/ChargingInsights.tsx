import React from 'react';
import { Zap, BatteryCharging, Gauge } from 'lucide-react';

interface ChargingInsightsProps {
  charging: {
    instances: number;
    avgStartSOC: number;
    voltage: {
      avg: number;
      min: number;
      max: number;
    };
  };
}

export function ChargingInsights({ charging }: ChargingInsightsProps) {
  const voltagePercentage = ((charging.voltage.avg - 360) / (420 - 360)) * 100;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <BatteryCharging className="w-5 h-5 text-amber-500" />
        Charging Insights
      </h3>

      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
          <div className="flex items-center justify-between text-white mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm">Charging Instances</span>
            </div>
          </div>
          <div className="text-3xl text-white mt-2">{charging.instances}</div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Avg Start SOC</span>
            <span className="text-xl dark:text-white">{charging.avgStartSOC.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${charging.avgStartSOC}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Voltage Metrics</span>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Average</span>
              <span className="text-sm dark:text-white">{charging.voltage.avg.toFixed(1)}V</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${voltagePercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Min</div>
              <div className="text-lg dark:text-white">{charging.voltage.min.toFixed(1)}V</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Max</div>
              <div className="text-lg dark:text-white">{charging.voltage.max.toFixed(1)}V</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}