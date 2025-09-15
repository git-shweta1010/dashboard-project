// src/components/PieChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#2d2d2d',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '14px',
      }}>
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function CategoryPieChart({ data, startDate, endDate }) {
  // Filter by date range
  const filteredData = data.filter((d) => {
    const date = new Date(d.date);
    return (!startDate || date >= new Date(startDate)) && (!endDate || date <= new Date(endDate));
  });

  // Aggregate values per product name
  const aggregated = filteredData.reduce((acc, curr) => {
    acc[curr.name] = (acc[curr.name] || 0) + curr.value;
    return acc;
  }, {});

  // Convert aggregation object to array
  const pieData = Object.entries(aggregated).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-gray-200 text-lg font-semibold mb-4">Sales Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" wrapperStyle={{ color: '#cbd5e1' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
