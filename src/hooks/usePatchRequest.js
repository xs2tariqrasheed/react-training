import { useState, useEffect } from 'react';
import axios from 'axios';


// remove it
function usePatchRequest(url, initialData = {}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchData = async (postData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(url, postData);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, patchData };
}

export default usePatchRequest;
