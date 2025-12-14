# 🔋 Electric Vehicle Battery Analytics Dashboard

A modern, real-time analytics dashboard for monitoring electric vehicle battery performance, health metrics, and telemetry data. Built for the Zenfinity Energy internship assessment.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.3-purple)

## ✨ Features

### 📊 Real-Time Analytics
- **Battery Selection**: Switch between multiple battery packs with detailed summary metrics
- **Cycle Navigation**: Navigate through charge/discharge cycles with intuitive controls
- **Live Data**: Real-time data fetching from Zenfinity Battery Snapshots API

### 📈 Comprehensive Metrics
- **Cycle Statistics**: Duration, SOH drop, SOC values, timestamps
- **Performance Metrics**: Speed, distance, and motion analytics
- **Battery Health**: SOC/SOH visualization with color-coded status indicators
- **Temperature Distribution**: Interactive charts showing thermal behavior
- **Charging Insights**: Voltage metrics and charging pattern analysis
- **Alerts & Warnings**: Real-time safety event monitoring

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Mode**: Full dark mode support with smooth transitions
- **Glassmorphism**: Modern design with frosted glass effects
- **Smooth Animations**: Polished micro-interactions and transitions
- **Accessible**: WCAG compliant with keyboard navigation

## 🚀 Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 6.3
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Live Demo

Open `http://localhost:3000` after running `npm run dev`

## 📊 API Integration

Connects to Zenfinity Battery Snapshots API with authorized IMEIs:
- `865044073967657` (113 cycles)
- `865044073949366` (76 cycles)

## 🎯 Assignment Requirements

✅ Data Retrieval from API  
✅ Cycle Navigation  
✅ Cycle Statistics Display  
✅ Performance Metrics Visualization  
✅ Temperature Distribution Charts  
✅ Battery Health (SOC & SOH)  
✅ Alerts & Safety Events  
✅ Charging Insights  
✅ Long-term Trend Analysis  
✅ Responsive Design  
✅ Dark Mode Support  

## 📄 License

MIT

---

**Built for Zenfinity Energy Internship Assessment**  
**Deadline**: December 14, 2025
