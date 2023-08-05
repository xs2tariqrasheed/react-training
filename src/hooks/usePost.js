import { useState } from 'react';
import axios from 'axios';

function usePost({
  url,
  axiosConfig = {},
  axiosInstance = axios,
  onError = () => {},
  onSuccess = () => {},
}) {
  // change name to response
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(url, data, axiosConfig);
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, post };
}

export default usePost;
