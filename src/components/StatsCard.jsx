// src/components/StatsCard.jsx

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function StatsCard({ title, value, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4"
    >
      <div className="p-3 bg-blue-600 rounded-full">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold">
          <CountUp
            start={0}
            end={parseFloat(String(value).replace(/[^0-9.]/g, ''))}
            duration={1.5}
            prefix={value.startsWith('$') ? '$' : ''}
            suffix={value.includes('%') ? '%' : ''}
          />
        </h3>
      </div>
    </motion.div>
);
}
