/**
 * API Service for Battery Analytics Dashboard
 * Connects to the Zenfinity Battery Snapshots API
 */

export interface ApiCycleSnapshot {
  imei: string;
  cycle_number: number;
  cycle_start_time: string;
  cycle_end_time: string;
  cycle_duration_hours: number;
  soh_drop: number;
  average_soc: number;
  min_soc: number;
  max_soc: number;
  average_soh: number;
  average_temperature: number;
  temperature_dist_5deg: Record<string, number>;
  temperature_dist_10deg: Record<string, number>;
  temperature_dist_15deg: Record<string, number>;
  temperature_dist_20deg: Record<string, number>;
  total_distance: number | null;
  average_speed: number | null;
  max_speed: number | null;
  charging_instances_count: number;
  average_charge_start_soc: number;
  voltage_avg: number;
  voltage_min: number;
  voltage_max: number;
  alert_details: {
    warnings: string[];
    protections: string[];
  };
}

export interface ApiBatterySummary {
  imei: string;
  total_cycles: number;
  avg_soh_across_cycles: number;
  last_cycle_time: string;
}

class BatteryApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const fullPath = this.baseUrl ? `${this.baseUrl}${path}` : path;
    
    if (!params || Object.keys(params).length === 0) {
      return fullPath;
    }

    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    return `${fullPath}?${queryString}`;
  }

  private async handleRequest<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async fetchSummary(): Promise<ApiBatterySummary[]> {
    const url = this.buildUrl('/api/snapshots/summary');
    const response = await this.handleRequest<{ success: boolean; summary: any[] }>(url);
    
    return response.summary.map((item: any) => ({
      imei: item.imei,
      total_cycles: item.total_cycles,
      avg_soh_across_cycles: item.avg_soh_across_cycles,
      last_cycle_time: item.last_cycle_time,
    }));
  }

  async fetchAllCycles(imei: string): Promise<ApiCycleSnapshot[]> {
    const params: Record<string, string> = { imei };
    const url = this.buildUrl('/api/snapshots', params);
    const response = await this.handleRequest<{ success: boolean; data: any[] }>(url);
    return response.data;
  }

  async fetchCycleByNumber(imei: string, cycleNumber: number): Promise<ApiCycleSnapshot> {
    const params: Record<string, string> = { 
      imei, 
      cycle_number: cycleNumber.toString() 
    };
    const url = this.buildUrl('/api/snapshots', params);
    const response = await this.handleRequest<{ success: boolean; data: any[] }>(url);
    
    if (response.data.length === 0) {
      throw new Error(`Cycle ${cycleNumber} not found`);
    }
    
    return response.data[0];
  }
}

export const apiService = new BatteryApiService();
