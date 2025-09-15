# Interactive Dashboard Project

## Overview

This project is a responsive, data-driven dashboard built with React, Tailwind CSS, React Query, Framer Motion, and Recharts. It visualizes business metrics with animated stat cards, dynamic charts, and searchable tables, providing a seamless user experience both on desktop and mobile. Data is fetched from a mock backend using JSON Server.

## Features

- **Animated Stats Cards:** Live counters for key KPIs (Revenue, Users, Orders, Growth)  
- **Dynamic Charting:**  
  - Line chart visualizing monthly revenue  
  - Pie chart showing product sales breakdown, both synced with date range filters  
- **Date Range Filtering:** All metrics and charts update interactively  
- **Searchable Data Table:** Find users instantly with built-in search  
- **Responsive Design:** Optimized layouts for desktop and mobile  
- **Loading Skeletons:** Smooth user experience on data fetch

## Technology Stack

- **Frontend:** React, Tailwind CSS  
- **Charts & Animation:** Recharts, CountUp, Framer Motion  
- **Data Fetching & State:** React Query  
- **API:** JSON Server (REST mock backend)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/yourusername/dashboard-project.git
   cd dashboard-project

2. **Install dependencies:**
   npm install
   # or
   yarn install

3. **Start JSON Server API:**
  npm run serve:api

4. **Start the React App:**
  npm run dev
  # or
  yarn dev


### Usage
-Dashboard auto-fetches and displays stats, charts, and tables from API

-Select start/end dates to filter data interactively

-Use the search box to filter users in the table

-View the dashboard in mobile and desktop resolutions for responsive experience

### File Structure

src/
├── components/
│   ├── StatsCard.jsx
│   ├── LineChart.jsx
│   ├── PieChart.jsx
│   ├── DataTable.jsx
├── pages/
│   └── Dashboard.jsx
├── db.json        # JSON Server mock data

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run serve:api # Start JSON Server mock API

## Customization

- Update `db.json` to match your data model for charts or users  
- Modify colors and styling via Tailwind utility classes  
- Adjust chart types and animations in respective components

## Key Features Implementation

- **Animated Stats Cards**  
  Uses Framer Motion for smooth entrance animations and CountUp for number counting effects.  

- **Dynamic Date Filtering**  
  Charts and stats automatically update when date range is modified, filtering data client-side.  

- **Responsive Design**  
  Tailwind CSS ensures optimal layout across all device sizes with a mobile-first approach.  

## Deployment

Deploy easily to Vercel, Netlify, or Render.  
Ensure the API (`db.json`) is accessible or use a cloud-hosted JSON Server.  


## Dependencies

```json
{
  "react": "^18.x",
  "react-query": "^4.x",
  "framer-motion": "^10.x",
  "recharts": "^2.x",
  "react-countup": "^6.x",
  "tailwindcss": "^3.x",
  "json-server": "^0.17.x"
}




  

   
 

