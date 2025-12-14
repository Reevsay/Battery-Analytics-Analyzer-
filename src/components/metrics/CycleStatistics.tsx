import React from 'react';
import { Calendar, Clock, TrendingDown, Activity } from 'lucide-react';
import { type CycleData } from '../../data/mockData';

interface CycleStatisticsProps {
  cycle: CycleData;
}

export function CycleStatistics({ cycle }: CycleStatisticsProps) {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <Activity className="w-5 h-5 text-blue-500" />
        Cycle Statistics
      </h3>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cycle Number</div>
            <div className="text-2xl dark:text-white">{cycle.cycleNumber}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Start Time</div>
            <div className="dark:text-white truncate">{formatDate(cycle.startTime)}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">End Time</div>
            <div className="dark:text-white truncate">{formatDate(cycle.endTime)}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</div>
            <div className="text-xl dark:text-white">{cycle.duration.toFixed(1)} hours</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">SOH Drop</div>
            <div className="text-xl dark:text-white">{cycle.sohDrop.toFixed(2)}%</div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-slate-700 mt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">SOC Range</div>
          <div className="flex justify-between text-sm gap-4">
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">Avg</div>
              <div className="dark:text-white">{cycle.soc.average.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">Min</div>
              <div className="dark:text-white">{cycle.soc.min.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">Max</div>
              <div className="dark:text-white">{cycle.soc.max.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}