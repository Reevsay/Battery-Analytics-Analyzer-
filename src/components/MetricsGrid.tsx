import React from 'react';
import { CycleStatistics } from './metrics/CycleStatistics';
import { PerformanceMetrics } from './metrics/PerformanceMetrics';
import { BatteryHealth } from './metrics/BatteryHealth';
import { TemperatureDistribution } from './metrics/TemperatureDistribution';
import { ChargingInsights } from './metrics/ChargingInsights';
import { AlertsDisplay } from './metrics/AlertsDisplay';
import { TrendAnalysis } from './metrics/TrendAnalysis';
import { type CycleData } from '../data/mockData';

interface MetricsGridProps {
  cycle: CycleData;
  allCycles: CycleData[];
  darkMode: boolean;
}

export function MetricsGrid({ cycle, allCycles, darkMode }: MetricsGridProps) {
  return (
    <div className="space-y-8">
      {/* Row 1: Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CycleStatistics cycle={cycle} />
        <PerformanceMetrics performance={cycle.performance} />
        <BatteryHealth soc={cycle.soc} soh={cycle.soh} />
      </div>

      {/* Row 2: Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TemperatureDistribution distribution={cycle.temperature.distribution} />
        </div>
        <ChargingInsights charging={cycle.charging} />
      </div>

      {/* Row 3: Alerts */}
      <AlertsDisplay alerts={cycle.alerts} />

      {/* Row 4: Trend Analysis */}
      <TrendAnalysis cycles={allCycles} darkMode={darkMode} />
    </div>
  );
}