/**
 * Data Transformer
 * Converts API data format to frontend data format
 */

import type { ApiCycleSnapshot, ApiBatterySummary } from './api';
import type { Battery, CycleData } from '../data/mockData';

export function transformCycleData(apiCycle: ApiCycleSnapshot): CycleData {
  // Transform temperature distribution from API format to frontend format
  const tempDist = apiCycle.temperature_dist_10deg || {};
  const distribution = Object.entries(tempDist).map(([range, minutes]) => ({
    range: range,
    minutes: minutes,
  }));

  return {
    cycleNumber: apiCycle.cycle_number,
    startTime: apiCycle.cycle_start_time,
    endTime: apiCycle.cycle_end_time,
    duration: apiCycle.cycle_duration_hours,
    sohDrop: apiCycle.soh_drop,
    soc: {
      average: apiCycle.average_soc,
      min: apiCycle.min_soc,
      max: apiCycle.max_soc,
      current: apiCycle.average_soc, // Use average as current
    },
    soh: apiCycle.average_soh || 100 - (apiCycle.cycle_number * 0.05), // Estimate if not provided
    performance: {
      speed: apiCycle.average_speed || 0,
      distance: apiCycle.total_distance || 0,
      avgSpeed: apiCycle.average_speed || 0,
      maxSpeed: apiCycle.max_speed || 0,
    },
    temperature: {
      distribution: distribution,
    },
    charging: {
      instances: apiCycle.charging_instances_count,
      avgStartSOC: apiCycle.average_charge_start_soc,
      voltage: {
        avg: apiCycle.voltage_avg,
        min: apiCycle.voltage_min,
        max: apiCycle.voltage_max,
      },
    },
    alerts: {
      warnings: apiCycle.alert_details.warnings,
      protectionEvents: apiCycle.alert_details.protections,
    },
  };
}

export function transformBatteryData(
  summary: ApiBatterySummary,
  cycles: ApiCycleSnapshot[]
): Battery {
  return {
    id: summary.imei,
    imei: summary.imei,
    cycles: cycles.map(transformCycleData),
  };
}
