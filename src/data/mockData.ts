export interface CycleData {
  cycleNumber: number;
  startTime: string;
  endTime: string;
  duration: number; // hours
  sohDrop: number; // percentage
  soc: {
    average: number;
    min: number;
    max: number;
    current: number;
  };
  soh: number; // percentage
  performance: {
    speed: number; // km/h
    distance: number; // km
    avgSpeed: number;
    maxSpeed: number;
  };
  temperature: {
    distribution: {
      range: string;
      minutes: number;
    }[];
  };
  charging: {
    instances: number;
    avgStartSOC: number;
    voltage: {
      avg: number;
      min: number;
      max: number;
    };
  };
  alerts: {
    warnings: string[];
    protectionEvents: string[];
  };
}

export interface Battery {
  id: string;
  imei: string;
  cycles: CycleData[];
}

// Generate mock temperature distribution
const generateTempDistribution = (interval: number = 10) => {
  const ranges = [];
  for (let i = -20; i <= 60; i += interval) {
    ranges.push({
      range: `${i}°C to ${i + interval}°C`,
      minutes: Math.floor(Math.random() * 120) + 10
    });
  }
  return ranges;
};

// Generate mock cycle data
const generateCycle = (cycleNumber: number): CycleData => {
  const baseSOH = 100 - (cycleNumber * 0.08);
  const hasWarnings = Math.random() > 0.7;
  const hasProtection = Math.random() > 0.9;

  return {
    cycleNumber,
    startTime: new Date(Date.now() - (113 - cycleNumber) * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - (113 - cycleNumber) * 24 * 60 * 60 * 1000 + 3.5 * 60 * 60 * 1000).toISOString(),
    duration: 3.5 + Math.random() * 2,
    sohDrop: 0.05 + Math.random() * 0.15,
    soc: {
      average: 65 + Math.random() * 20,
      min: 20 + Math.random() * 15,
      max: 95 + Math.random() * 5,
      current: 75 + Math.random() * 20,
    },
    soh: baseSOH + Math.random() * 2,
    performance: {
      speed: 45 + Math.random() * 35,
      distance: 120 + Math.random() * 80,
      avgSpeed: 42 + Math.random() * 20,
      maxSpeed: 75 + Math.random() * 45,
    },
    temperature: {
      distribution: generateTempDistribution(10),
    },
    charging: {
      instances: Math.floor(Math.random() * 5) + 2,
      avgStartSOC: 25 + Math.random() * 30,
      voltage: {
        avg: 385 + Math.random() * 20,
        min: 365 + Math.random() * 10,
        max: 405 + Math.random() * 10,
      },
    },
    alerts: {
      warnings: hasWarnings ? ['High temperature detected', 'Low SOC event'] : [],
      protectionEvents: hasProtection ? ['Overcurrent protection triggered'] : [],
    },
  };
};

// Generate multiple batteries
export const mockBatteries: Battery[] = [
  {
    id: '1',
    imei: '865234052631478',
    cycles: Array.from({ length: 113 }, (_, i) => generateCycle(i + 1)),
  },
  {
    id: '2',
    imei: '865234052631892',
    cycles: Array.from({ length: 87 }, (_, i) => generateCycle(i + 1)),
  },
  {
    id: '3',
    imei: '865234052632145',
    cycles: Array.from({ length: 156 }, (_, i) => generateCycle(i + 1)),
  },
];
