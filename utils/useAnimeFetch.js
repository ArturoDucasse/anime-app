import { useEffect, useState } from "react";

const useAnimeFetch = (animeIdArray) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const temp = [];
      for (let animeId of animeIdArray) {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}`
        );
        const { data } = await response.json();
        temp.push(data);
      }
      setData(temp);
    };

    fetchData();
  }, []);

  return data;
};

export default useAnimeFetch;
