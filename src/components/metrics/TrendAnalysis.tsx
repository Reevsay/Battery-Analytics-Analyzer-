import React, { useState } from 'react';
import { TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type CycleData } from '../../data/mockData';

interface TrendAnalysisProps {
  cycles: CycleData[];
  darkMode: boolean;
}

export function TrendAnalysis({ cycles, darkMode }: TrendAnalysisProps) {
  const [expanded, setExpanded] = useState(false);
  const [visibleMetrics, setVisibleMetrics] = useState({
    soh: true,
    soc: true,
    distance: false,
    temp: false,
  });

  const toggleMetric = (metric: keyof typeof visibleMetrics) => {
    setVisibleMetrics(prev => ({ ...prev, [metric]: !prev[metric] }));
  };

  const chartData = cycles.map(cycle => ({
    cycle: cycle.cycleNumber,
    soh: cycle.soh,
    soc: cycle.soc.average,
    distance: cycle.performance.distance,
    temp: 25 + Math.random() * 15, // Mock temperature
  }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-8 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <TrendingDown className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg text-gray-900 dark:text-white">Trend Analysis</h3>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
            {cycles.length} cycles
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="px-8 pb-8 pt-0 animate-in slide-in-from-top duration-300">
          <div className="flex flex-wrap gap-3 mb-8">
            <MetricToggle
              label="SOH"
              color="bg-emerald-500"
              active={visibleMetrics.soh}
              onClick={() => toggleMetric('soh')}
            />
            <MetricToggle
              label="SOC"
              color="bg-blue-500"
              active={visibleMetrics.soc}
              onClick={() => toggleMetric('soc')}
            />
            <MetricToggle
              label="Distance"
              color="bg-cyan-500"
              active={visibleMetrics.distance}
              onClick={() => toggleMetric('distance')}
            />
            <MetricToggle
              label="Temperature"
              color="bg-orange-500"
              active={visibleMetrics.temp}
              onClick={() => toggleMetric('temp')}
            />
          </div>

          <div className="px-2">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis 
                  dataKey="cycle" 
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: '#6B7280' }}
                  label={{ value: 'Cycle Number', position: 'insideBottom', offset: -10, style: { fill: '#6B7280' } }}
                />
                <YAxis 
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    color: darkMode ? '#fff' : '#000',
                    backdropFilter: 'blur(10px)',
                    padding: '12px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                {visibleMetrics.soh && (
                  <Line 
                    type="monotone" 
                    dataKey="soh" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={false}
                    name="SOH (%)"
                  />
                )}
                {visibleMetrics.soc && (
                  <Line 
                    type="monotone" 
                    dataKey="soc" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={false}
                    name="Avg SOC (%)"
                  />
                )}
                {visibleMetrics.distance && (
                  <Line 
                    type="monotone" 
                    dataKey="distance" 
                    stroke="#06B6D4" 
                    strokeWidth={2}
                    dot={false}
                    name="Distance (km)"
                  />
                )}
                {visibleMetrics.temp && (
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    dot={false}
                    name="Avg Temp (°C)"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

interface MetricToggleProps {
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}

function MetricToggle({ label, color, active, onClick }: MetricToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 ${
        active
          ? `${color} text-white shadow-lg`
          : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
      }`}
    >
      <div className={`w-3 h-3 rounded-full ${active ? 'bg-white' : color}`}></div>
      <span className="text-sm">{label}</span>
    </button>
  );
}