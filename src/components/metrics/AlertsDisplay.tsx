import React from 'react';
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface AlertsDisplayProps {
  alerts: {
    warnings: string[];
    protectionEvents: string[];
  };
}

export function AlertsDisplay({ alerts }: AlertsDisplayProps) {
  const hasAlerts = alerts.warnings.length > 0 || alerts.protectionEvents.length > 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <Shield className="w-5 h-5 text-red-500" />
        Alerts & Warnings
      </h3>

      {!hasAlerts ? (
        <div className="flex items-center justify-center gap-3 p-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
          <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <span className="text-emerald-700 dark:text-emerald-300">
            No alerts - All systems operating normally
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {alerts.warnings.length > 0 && (
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Warnings
              </div>
              <div className="flex flex-wrap gap-3">
                {alerts.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    {warning}
                  </div>
                ))}
              </div>
            </div>
          )}

          {alerts.protectionEvents.length > 0 && (
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Protection Events
              </div>
              <div className="flex flex-wrap gap-3">
                {alerts.protectionEvents.map((event, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    {event}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}