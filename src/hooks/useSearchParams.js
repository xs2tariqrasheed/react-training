import { useSearchParams as useSearchParamsRR } from "react-router-dom";

const useSearchParams = (
  config = {
    optional: [],
  }
) => {
  const { optional } = config;
  const params = [...getSearchParamsKeys(), ...optional];
  const [searchParams, setSearchParams] = useSearchParamsRR();

  const getSearchParamSetter = (paramName) => (paramValue) =>
    searchParams.set(paramName, paramValue);

  const paramsObject = {};
  params.forEach((param) => {
    const setter = getSearchParamSetter(param);
    paramsObject[param] = { value: searchParams.get(param), setValue: setter };
  });

  return {
    ...paramsObject,
    searchParams,
    updateSearchParams: () => setSearchParams(searchParams),
  };
};

function getSearchParamsKeys() {
  const params = new URLSearchParams(window.location.search);
  let keysArray = [];
  for (let key of params.keys()) {
    keysArray.push(key);
  }
  return keysArray;
}

export default useSearchParams;
