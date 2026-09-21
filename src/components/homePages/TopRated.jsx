import React, { useEffect, useState } from "react";
import HomeLayout from "../HomeLayout";

const TopRated = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_KEY;

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`,
        );

        const data = await response.json();

        console.log(data);

        setMovies(data.results || []);
      } catch (error) {
        console.error("Top Rated API Error:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <section
      className="
        relative
        z-20
        -mt-12
        bg-black
        py-6
        sm:-mt-16
        sm:py-7
        md:-mt-20
        md:py-8
      "
    >
      <HomeLayout>
        {/* Heading */}

        <h2
          className="
            mb-4
            text-[20px]
            font-bold
            text-white
            sm:mb-5
            sm:text-[22px]
            md:text-[24px]
          "
        >
          Top Rated
        </h2>

        {/* Movies */}

        <div
          className="
            flex
            gap-2
            overflow-x-auto
            scrollbar-none
            py-4
            sm:gap-3
            sm:py-5
            md:gap-4
            md:py-6
          "
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="
                group
                relative
                h-[220px]
                w-[145px]
                shrink-0
                overflow-hidden
                rounded-lg
                transition-all
                duration-300
                ease-out
                hover:z-50
                hover:scale-105

                sm:h-[245px]
                sm:w-[165px]
                sm:rounded-xl

                md:h-[270px]
                md:w-[180px]
                md:rounded-xl
                md:hover:scale-110
              "
            >
              {/* Movie Image */}

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="h-full w-full object-cover"
              />

              {/* Dark Overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-black/0
                  transition-all
                  duration-300
                  group-hover:bg-black/30
                "
              />

              {/* Play Button */}

              <button
                type="button"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  flex
                  h-11
                  w-11
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-[#e50914]
                  opacity-0
                  shadow-lg
                  transition-all
                  duration-300
                  group-hover:opacity-100
                  hover:scale-110

                  sm:h-12
                  sm:w-12

                  md:h-14
                  md:w-14
                "
              >
                <span
                  className="
                    ml-1
                    h-0
                    w-0
                    border-y-[9px]
                    border-y-transparent
                    border-l-[14px]
                    border-l-white

                    sm:border-y-[10px]
                    sm:border-l-[16px]

                    md:border-y-12
                    md:border-l-18
                  "
                />
              </button>

              {/* Bottom Gradient */}

              <div
                className="
                  absolute
                  right-0
                  bottom-0
                  left-0
                  h-20
                  bg-linear-to-t
                  from-black/90
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100

                  sm:h-24

                  md:h-28
                "
              />

              {/* Movie Title */}

              <div
                className="
                  absolute
                  right-2
                  bottom-3
                  left-3
                  translate-y-3
                  truncate
                  text-[14px]
                  font-bold
                  text-white
                  opacity-0
                  transition-all
                  duration-300
                  group-hover:translate-y-0
                  group-hover:opacity-100

                  sm:bottom-4
                  sm:left-4
                  sm:text-[16px]

                  md:text-[18px]
                "
              >
                {movie.title || movie.name}
              </div>
            </div>
          ))}
        </div>
      </HomeLayout>
    </section>
  );
};

export default TopRated;