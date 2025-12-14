import React from 'react';
import { Gauge, Navigation, TrendingUp, Zap } from 'lucide-react';

interface PerformanceMetricsProps {
  performance: {
    speed: number;
    distance: number;
    avgSpeed: number;
    maxSpeed: number;
  };
}

export function PerformanceMetrics({ performance }: PerformanceMetricsProps) {
  const speedPercentage = Math.min((performance.speed / 120) * 100, 100);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <Zap className="w-5 h-5 text-cyan-500" />
        Performance Metrics
      </h3>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Current Speed</span>
          <span className="text-2xl dark:text-white">{performance.speed.toFixed(0)} km/h</span>
        </div>
        
        <div className="relative h-4 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${speedPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>0 km/h</span>
          <span>120 km/h</span>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
            <Navigation className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Distance Traveled</div>
            <div className="text-2xl dark:text-white">{performance.distance.toFixed(1)} km</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Speed</div>
            <div className="text-xl dark:text-white">{performance.avgSpeed.toFixed(1)} km/h</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Max Speed</div>
            <div className="text-xl dark:text-white">{performance.maxSpeed.toFixed(1)} km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
}