import { useMemo } from "react";
import MovieRowApi from "./MovieRowApi";
import MovieRow from "./MovieRow";
import HomeHero from "./HomeHero";
import useFetch from "../hooks/UseFetch";

const Movies = () => {
  const { data: movies = [], loading } = useFetch(
    "discover/movie?with_origin_country=IN&sort_by=popularity.desc",
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
        {/* Indian Movies */}
        <MovieRow
          title="Indian Movies"
          movies={movies}
        />

        {/* Hindi Movies */}
        <MovieRowApi
          title="Hindi Movies"
          endpoint="discover/movie?with_original_language=hi&sort_by=popularity.desc"
        />

        {/* Indian Action */}
        <MovieRowApi
          title="Indian Action Movies"
          endpoint="discover/movie?with_origin_country=IN&with_genres=28&sort_by=popularity.desc"
        />

        {/* Indian Comedy */}
        <MovieRowApi
          title="Indian Comedy Movies"
          endpoint="discover/movie?with_origin_country=IN&with_genres=35&sort_by=popularity.desc"
        />

        {/* Indian Romance */}
        <MovieRowApi
          title="Indian Romance Movies"
          endpoint="discover/movie?with_origin_country=IN&with_genres=10749&sort_by=popularity.desc"
        />

        {/* Indian Horror */}
        <MovieRowApi
          title="Indian Horror Movies"
          endpoint="discover/movie?with_origin_country=IN&with_genres=27&sort_by=popularity.desc"
        />
      </main>
    </>
  );
};

export default Movies;