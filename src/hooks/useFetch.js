import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (apiRoute, axiosConfig = {}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(axiosConfig.initialData);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios(apiRoute, axiosConfig);
      setData(response.data);
      setError(null); // Clear any previous error on a successful fetch
    } catch (err) {
      setError(err);
      if (axiosConfig.onError && typeof axiosConfig.onError === "function") {
        axiosConfig.onError(err); // Call onError handler if provided
      }
    } finally {
      setLoading(false);
    }
  }, [apiRoute, axiosConfig]);

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error, refetch: fetchData };
};

export default useFetch;
