import { useEffect, useState } from "react";
import MovieRowApi from "../homePages/MovieRowApi";
import HomeHero from "../homePages/HomeHero";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [heroShow, setHeroShow] = useState(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/tv/popular",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              accept: "application/json",
            },
          },
        );

        const data = await response.json();
        const results = data.results || [];


        setTvShows(results);

        if (results.length > 0) {
          const randomShow =
            results[Math.floor(Math.random() * results.length)];


          setHeroShow(randomShow);
        }
      } catch (error) {
        console.error("TV Shows API Error:", error);
      }
    };

    fetchTVShows();
  }, []);

  return (
    <>
      {/* Hero */}
      <HomeHero movie={heroShow} />

      {/* TV Shows */}
      <main className="bg-black pb-8 sm:pb-10 md:pb-12">
        <MovieRowApi
          title="Popular TV Shows"
          endpoint="tv/popular"
        />

        <MovieRowApi
          title="Top Rated TV Shows"
          endpoint="tv/top_rated"
        />

        <MovieRowApi
          title="Indian TV Shows"
          endpoint="discover/tv?with_origin_country=IN&sort_by=popularity.desc"
        />

        <MovieRowApi
          title="Comedy TV Shows"
          endpoint="discover/tv?with_genres=35&sort_by=popularity.desc"
        />

        <MovieRowApi
          title="Drama TV Shows"
          endpoint="discover/tv?with_genres=18&sort_by=popularity.desc"
        />

        <MovieRowApi
          title="Action & Adventure"
          endpoint="discover/tv?with_genres=10759&sort_by=popularity.desc"
        />
      </main>
    </>
  );
};

export default TVShows;