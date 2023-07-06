import { useState, useEffect } from "react";

const useSearchParam = (param) => {
  const getSearchParam = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  };

  const [value, setValue] = useState(getSearchParam());

  useEffect(() => {
    const handlePopState = () => {
      setValue(getSearchParam());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  const setSearchParam = (newValue) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (newValue === null) {
      searchParams.delete(param);
    } else {
      searchParams.set(param, newValue);
    }

    window.history.pushState(null, "", "?" + searchParams.toString());

    setValue(getSearchParam());
  };

  return [value, setSearchParam];
};

export default useSearchParam;
