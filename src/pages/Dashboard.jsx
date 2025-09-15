// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import RevenueLineChart from '../components/LineChart';
import CategoryPieChart from '../components/PieChart';
import DataTable from '../components/DataTable';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Dashboard() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]   = useState('');

  // Fetch table data (users)
  const {
    data: tableData = [],
    isLoading: tableLoading,
  } = useQuery({
    queryKey: ['tableData'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/tableData');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });

  // Fetch line chart data (monthly revenue)
  const {
    data: chartData = [],
    isLoading: chartLoading,
  } = useQuery({
    queryKey: ['chartData'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/chartData');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });

  // Fetch product sales (for pie chart and orders)
  const {
    data: productSales = [],
    isLoading: salesLoading,
  } = useQuery({
    queryKey: ['productSales'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/productSales');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });

  // Filter chartData by date range
  const filteredChartData = chartData.filter(d => {
    const date = new Date(d.date);
    return (!startDate || date >= new Date(startDate)) &&
           (!endDate || date <= new Date(endDate));
  });

  // Calculate revenue (sum)
  const revenue = filteredChartData.reduce((acc, curr) => acc + curr.value, 0);

  // Users count (from tableData, static - no date filter)
  const usersCount = tableData.length;

  // Filter productSales by date range
  const filteredProductSales = productSales.filter(d => {
    const date = new Date(d.date);
    return (!startDate || date >= new Date(startDate)) &&
           (!endDate || date <= new Date(endDate));
  });

  // Calculate orders (sum productSales values)
  const ordersCount = filteredProductSales.reduce((acc, curr) => acc + curr.value, 0);

  // Calculate growth % as % change between last two months in filteredChartData
  const sortedChartData = [...filteredChartData].sort((a, b) => new Date(a.date) - new Date(b.date));
  let growthPercentage = 0;
  if (sortedChartData.length >= 2) {
    const last = sortedChartData[sortedChartData.length - 1].value;
    const prev = sortedChartData[sortedChartData.length - 2].value;
    growthPercentage = ((last - prev) / prev) * 100;
  }
  growthPercentage = Math.round(growthPercentage);

  return (
    <div className="space-y-6 p-4">
      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Revenue" value={`$${revenue.toLocaleString()}`} icon={DollarSign} />
        <StatsCard title="Users" value={usersCount.toLocaleString()} icon={Users} />
        <StatsCard title="Orders" value={ordersCount.toLocaleString()} icon={ShoppingCart} />
        <StatsCard title="Growth" value={`${growthPercentage}%`} icon={TrendingUp} />
      </section>

      {/* Date Range Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div>
          <label className="block text-sm text-gray-300">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="mt-1 px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="mt-1 px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartLoading ? (
          <Skeleton height={250} baseColor="#374151" highlightColor="#4B5563" />
        ) : (
          <RevenueLineChart data={chartData} startDate={startDate} endDate={endDate} />
        )}
        {salesLoading ? (
          <Skeleton height={250} baseColor="#374151" highlightColor="#4B5563" />
        ) : (
          <CategoryPieChart data={productSales} startDate={startDate} endDate={endDate} />
        )}
      </section>

      {/* Data Table */}
      <section>
        {tableLoading ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height={30} baseColor="#374151" highlightColor="#4B5563" />
            ))}
          </div>
        ) : (
          <DataTable data={tableData} />
        )}
      </section>
    </div>
  );
}
