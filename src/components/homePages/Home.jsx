import { useEffect, useMemo, useState } from "react";
import HomeHero from "./HomeHero";
import MovieRowApi from "./MovieRowApi";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`TMDB API Error: ${response.status}`);
        }

        const data = await response.json();

        setMovies(data.results || []);
      } catch (error) {
        console.error("Trending API Error:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const heroMovie = useMemo(() => {
    if (movies.length === 0) {
      return null;
    }

    return movies[Math.floor(Math.random() * movies.length)];
  }, [movies]);

  return (
    <>
      <HomeHero movie={heroMovie} />

      <main className="bg-black pb-8 sm:pb-10 md:pb-12">
        {/* 1. Trending */}
        <MovieRowApi
          title="Trending Now"
          endpoint="trending/movie/week"
          vertical
        />

        {/* 2. Worldwide */}
        <MovieRowApi
          title="Popular Worldwide"
          endpoint="movie/popular"
          vertical
        />

        {/* 3. Netflix */}
        <MovieRowApi
          title="Only on Netflix"
          endpoint="discover/movie?with_watch_providers=8&watch_region=IN&sort_by=popularity.desc"
          vertical
        />

        {/* 4. Top Rated */}
        <MovieRowApi
          title="Top Rated"
          endpoint="movie/top_rated"
          vertical
        />
      </main>
    </>
  );
};

export default Home;