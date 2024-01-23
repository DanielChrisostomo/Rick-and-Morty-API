import React from "react";

export const useFetch = (url) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(null);
  const [pagination, setPagination] = React.useState(null);

  React.useEffect(() => {
    async function request() {
      let json = null;
      let response = null;
      try {
        setLoading(true);
        const response = await fetch(url);
        json = await response.json();
        if (!response.ok) throw new Error("error trying fetch data");
        setPagination(json.info.pages);
        console.log(json.info.pages);
        if (data === null) setData(json.results);
        else setData([...data, ...json.results]);
      } catch (err) {
        json = null;
        setError("An error has ocurred");
      } finally {
        setLoading(false);
      }
    }
    request();
  }, [url]);

  return { data, setData, loading, error, pagination };
};
