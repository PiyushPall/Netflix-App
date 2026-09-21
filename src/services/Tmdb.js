const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day`,
    options
  );

  const data = await response.json();

  return data.results;
};