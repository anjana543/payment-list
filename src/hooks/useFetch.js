import { useEffect, useState, useCallback } from "react";

async function prepareHeaders(itemToFetch) {
  let { bearerToken, body, ...opts } = itemToFetch || {};

  let { headers, ...otherOpts } = opts;
  headers = headers || {};

  if (!headers["Accept"]) {
    headers["Accept"] = "application/json";
  }

  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (bearerToken) {
    headers["Authorization"] = `Bearer ${bearerToken}`;
  }

  const result = {
    headers,
    ...otherOpts,
  };

  if (body) {
    result.body = JSON.stringify(body);
  }

  return result;
}

const useFetch = (url, options, moreParam) => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const parsedOpts = await prepareHeaders(options);
      const res = await fetch(url, parsedOpts);
      const json = await res.json();
      setResponse(json);
      setIsLoading(false);
      if (moreParam) {
        setHasMore(json?.[moreParam] !== null);
      }
      if (!res.ok) throw res;
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return { response, error, isLoading, hasMore };
};

export default useFetch;
