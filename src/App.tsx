import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BatterySelector } from './components/BatterySelector';
import { CycleNavigator } from './components/CycleNavigator';
import { MetricsGrid } from './components/MetricsGrid';
import { type Battery, type CycleData } from './data/mockData';
import { apiService } from './services/api';
import { transformBatteryData } from './services/dataTransformer';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [selectedBatteryId, setSelectedBatteryId] = useState<string>('');
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load batteries on mount
  useEffect(() => {
    async function loadBatteries() {
      try {
        setLoading(true);
        setError(null);
        
        const summaries = await apiService.fetchSummary();
        console.log('📡 Loaded battery summaries:', summaries);
        
        // Load all cycles for each battery
        const batteriesData = await Promise.all(
          summaries.map(async (summary) => {
            const cycles = await apiService.fetchAllCycles(summary.imei);
            return transformBatteryData(summary, cycles);
          })
        );
        
        console.log('✅ Loaded batteries with cycles:', batteriesData);
        setBatteries(batteriesData);
        
        if (batteriesData.length > 0) {
          setSelectedBatteryId(batteriesData[0].id);
        }
      } catch (err) {
        console.error('❌ Error loading batteries:', err);
        setError('Failed to load battery data. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }
    
    loadBatteries();
  }, []);

  const selectedBattery = batteries.find(b => b.id === selectedBatteryId) || batteries[0];
  const currentCycle = selectedBattery?.cycles[currentCycleIndex];

  const handlePreviousCycle = () => {
    if (currentCycleIndex > 0) {
      setCurrentCycleIndex(currentCycleIndex - 1);
    }
  };

  const handleNextCycle = () => {
    if (selectedBattery && currentCycleIndex < selectedBattery.cycles.length - 1) {
      setCurrentCycleIndex(currentCycleIndex + 1);
    }
  };

  const handleCycleChange = (index: number) => {
    setCurrentCycleIndex(index);
  };

  const handleBatteryChange = (batteryId: string) => {
    setSelectedBatteryId(batteryId);
    setCurrentCycleIndex(0);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading battery data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No batteries state
  if (batteries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300">No batteries available</p>
        </div>
      </div>
    );
  }

  // No selected battery or cycle
  if (!selectedBattery || !currentCycle) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300">No cycle data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <Header 
          darkMode={darkMode} 
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          batteryImei={selectedBattery.imei}
        />
        
        <main className="container mx-auto px-4 py-6 max-w-[1920px]">
          <BatterySelector
            batteries={batteries}
            selectedBatteryId={selectedBatteryId}
            onBatteryChange={handleBatteryChange}
          />

          <CycleNavigator
            currentCycleIndex={currentCycleIndex}
            totalCycles={selectedBattery.cycles.length}
            onPrevious={handlePreviousCycle}
            onNext={handleNextCycle}
            onCycleChange={handleCycleChange}
          />

          <MetricsGrid
            cycle={currentCycle}
            allCycles={selectedBattery.cycles}
            darkMode={darkMode}
          />
        </main>
      </div>
    </div>
  );
}
