import { useMemo } from "react";
import useFetch from "../hooks/UseFetch";
import HomeHero from "./HomeHero";
import MovieRowApi from "./MovieRowApi";

const NewPopular = () => {
  const { data: movies = [], loading } = useFetch(
    "movie/now_playing",
  );

  const heroMovie = useMemo(() => {
    if (movies.length === 0) {
      return null;
    }

    return movies[Math.floor(Math.random() * movies.length)];
  }, [movies]);

  return (
    <>
      {/* Hero */}
      <HomeHero movie={heroMovie} />

      {/* Movie Sections */}
      <main className="bg-black pb-8 sm:pb-10 md:pb-12">
        <MovieRowApi
          title="New & Popular"
          endpoint="movie/now_playing"
        />

        <MovieRowApi
          title="Popular Movies"
          endpoint="movie/popular"
        />

        <MovieRowApi
          title="Trending This Week"
          endpoint="trending/movie/week"
        />

        <MovieRowApi
          title="Top Rated Movies"
          endpoint="movie/top_rated"
        />
      </main>
    </>
  );
};

export default NewPopular;