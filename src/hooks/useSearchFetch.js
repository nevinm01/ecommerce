import useSWR from "swr";
import axios from "axios";

export function useSearchFetch(triggerSearch, finalQuery, indexName) {
  const API_URL = "https://uat.search-assist.webc.in/api/search";

  const config = {
    "qa-en": {
      clientId: "7645129791",
      secretKey: "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
    },
    "qa-ar": {
      clientId: "5807942863",
      secretKey: "Llz5MR37gZ4gJULMwf762w1lQ13Iro",
    },
  };

  const fetcher = async (url, payload) => {
    const selectedConfig = config[indexName];
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "Client-Id": selectedConfig.clientId,
        "Secret-Key": selectedConfig.secretKey,
      },
    });
    return response.data;
  };

  const { data, error, isLoading } = useSWR(
    triggerSearch && finalQuery
      ? [
          API_URL,
          {
            search: finalQuery,
            filter: {},
            size: 50,
            sort_by: "1",
          },
          indexName,
        ]
      : null,
    ([url, payload]) => fetcher(url, payload),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const getItemsArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.results && Array.isArray(data.results)) return data.results;
    if (data.data && Array.isArray(data.data)) return data.data;
    if (data.items && Array.isArray(data.items)) return data.items;
    return [];
  };

  return {
    data: getItemsArray(data),
    error,
    isLoading,
  };
}
