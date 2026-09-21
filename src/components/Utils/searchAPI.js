const searchMoviesAndShows = async (query) => {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return [];
  }

  try {
    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      cleanQuery,
    )}&include_adult=false&language=en-US&page=1`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("TMDB SEARCH ERROR:", response.status);
      return [];
    }

    const data = await response.json();

    return (data.results || [])
      .filter(
        (item) =>
          item.media_type === "movie" ||
          item.media_type === "tv",
      )
      .filter((item) => item.poster_path)
      .slice(0, 6);
  } catch (error) {
    console.error("SEARCH FETCH ERROR:", error);
    return [];
  }
};

export default searchMoviesAndShows;