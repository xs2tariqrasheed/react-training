import { useState, useEffect } from 'react';
import axios from 'axios';

function usePostRequest(url, initialData = {}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (postData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, postData);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
}

export default usePostRequest;
