// src/hooks/useDashboardData.js
import useApi from "./useApi";
import { useEffect, useState } from "react";
export default function useDashboardData() {
  const api = useApi();
  const [data, setData] = useState({});
  useEffect(() => {
    api('/analytics/summary').then(setData);
  }, []);
  return data;
}
