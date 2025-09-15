// src/hooks/useFetchData.js

import { useQuery } from '@tanstack/react-query';

export function useFetchData() {
  return useQuery({
    queryKey: ['tableData'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/tableData');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
  });
}
