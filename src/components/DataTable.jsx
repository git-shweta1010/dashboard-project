// src/components/DataTable.jsx

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function DataTable({ data }) {
  const [filter, setFilter] = useState('');

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);

  if (!data) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        Loading table data...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map(key => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-700">
                {Object.values(row).map((val, i) => (
                  <td
                    key={i}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-200"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={data[0] ? Object.keys(data[0]).length : 1}
                  className="px-6 py-4 text-center text-gray-400"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
