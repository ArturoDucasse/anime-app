const fetchAnimes = async (animeIdArray) => {
  const temp = [];
  for (let animeId of animeIdArray) {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const { data } = await response.json();
    temp.push(data);
  }

  return temp;
};

export default fetchAnimes;
