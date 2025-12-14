import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CycleNavigatorProps {
  currentCycleIndex: number;
  totalCycles: number;
  onPrevious: () => void;
  onNext: () => void;
  onCycleChange: (index: number) => void;
}

export function CycleNavigator({ 
  currentCycleIndex, 
  totalCycles, 
  onPrevious, 
  onNext,
  onCycleChange 
}: CycleNavigatorProps) {
  const cycleNumber = currentCycleIndex + 1;
  const progress = ((currentCycleIndex + 1) / totalCycles) * 100;

  return (
    <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <button
          onClick={onPrevious}
          disabled={currentCycleIndex === 0}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all duration-200 hover:shadow-lg"
          aria-label="Previous cycle"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 w-full">
          <div className="text-center mb-4">
            <div className="text-4xl dark:text-white mb-2">Cycle {cycleNumber}</div>
            <div className="text-gray-600 dark:text-gray-400">
              of {totalCycles} total cycles
            </div>
          </div>

          <div className="relative px-2">
            <input
              type="range"
              min="0"
              max={totalCycles - 1}
              value={currentCycleIndex}
              onChange={(e) => onCycleChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #8B5CF6 ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`
              }}
            />
          </div>

          <div className="flex justify-between mt-3 text-sm text-gray-500 dark:text-gray-400 px-2">
            <span>Cycle 1</span>
            <span>Cycle {totalCycles}</span>
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={currentCycleIndex === totalCycles - 1}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all duration-200 hover:shadow-lg"
          aria-label="Next cycle"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}