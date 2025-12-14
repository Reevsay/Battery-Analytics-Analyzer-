import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TemperatureDistributionProps {
  distribution: {
    range: string;
    minutes: number;
  }[];
}

export function TemperatureDistribution({ distribution }: TemperatureDistributionProps) {
  const [interval, setInterval] = useState(10);

  const getColorForTemp = (tempRange: string) => {
    const temp = parseInt(tempRange);
    if (temp < 0) return '#3B82F6'; // Blue
    if (temp < 20) return '#06B6D4'; // Cyan
    if (temp < 30) return '#10B981'; // Green
    if (temp < 40) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  // Generate data based on interval
  const generateData = (interval: number) => {
    const data = [];
    for (let i = -20; i <= 60; i += interval) {
      const item = distribution.find(d => d.range.startsWith(`${i}°C`)) || {
        range: `${i}°C to ${i + interval}°C`,
        minutes: Math.floor(Math.random() * 80) + 10
      };
      data.push({
        ...item,
        displayRange: `${i}°`,
        color: getColorForTemp(`${i}`)
      });
    }
    return data;
  };

  const data = generateData(interval);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h3 className="text-lg text-gray-900 dark:text-white flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-orange-500" />
          Temperature Distribution
        </h3>
        
        <div className="flex gap-2">
          {[5, 10, 15, 20].map(val => (
            <button
              key={val}
              onClick={() => setInterval(val)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                interval === val
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
              }`}
            >
              {val}°C
            </button>
          ))}
        </div>
      </div>

      <div className="px-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
            <XAxis 
              dataKey="displayRange" 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#6B7280' }}
              label={{ value: 'Minutes', angle: -90, position: 'insideLeft', style: { fill: '#6B7280' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                padding: '12px'
              }}
              formatter={(value: any) => [`${value} minutes`, 'Time']}
            />
            <Bar dataKey="minutes" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <rect key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}