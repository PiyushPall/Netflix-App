import React, { useRef } from "react";
import Layout from "../components/Layout";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Trending = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -(scrollRef.current.clientWidth * 0.8),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: scrollRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const trendingMovies = [
    {
      id: 1,
      rank: 1,
      image: "/dhamal.webp",
      title: "Dhamaal 4",
    },
    {
      id: 2,
      rank: 2,
      image: "/fauda.webp",
      title: "Movie 2",
    },
    {
      id: 3,
      rank: 3,
      image: "/gandhari.webp",
      title: "Movie 3",
    },
    {
      id: 4,
      rank: 4,
      image: "/ikka.webp",
      title: "Movie 3",
    },
    {
      id: 5,
      rank: 5,
      image: "/kalyanam.webp",
      title: "Movie 3",
    },
    {
      id: 6,
      rank: 6,
      image: "/korean.webp",
      title: "Movie 3",
    },
    {
      id: 7,
      rank: 7,
      image: "/money-heist.webp",
      title: "Movie 3",
    },
    {
      id: 8,
      rank: 8,
      image: "/musafir.webp",
      title: "Movie 3",
    },
    {
      id: 9,
      rank: 9,
      image: "/newtons.webp",
      title: "Movie 3",
    },
    {
      id: 10,
      rank: 10,
      image: "/sexlife.webp",
      title: "Movie 3",
    },
  ];

  return (
    <div className="bg-black">
      <Layout>
        {/* Heading */}
        <h2
          className="
            pt-6
            pb-3
            text-[20px]
            text-white

            sm:pt-7
            sm:text-[22px]

            md:pt-8
            md:pb-4
            md:text-[24px]
          "
        >
          Trending Now
        </h2>

        {/* Scroll Container Wrapper */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={scrollLeft}
            aria-label="Previous movies"
            className="
              absolute
              left-0
              top-1/2
              z-30
              flex
              h-[90px]
              w-[26px]
              -translate-y-1/2
              items-center
              justify-center
              rounded-md
              bg-white/10
              text-white
              backdrop-blur-sm
              transition-all
              duration-200
              hover:bg-white/20
              active:scale-95

              sm:h-[105px]
              sm:w-[30px]

              md:h-[120px]
              md:w-[32px]
            "
          >
            <ChevronLeft
              size={24}
              strokeWidth={1.5}
              className="sm:h-7 sm:w-7 md:h-8 md:w-8"
            />
          </button>

          {/* Movies */}
          <div
            ref={scrollRef}
            className="
              flex
              gap-8
              overflow-x-auto
              scroll-smooth
              py-4
              pl-7
              pr-7
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:gap-10
              sm:pl-8
              sm:pr-8

              md:gap-12
            "
          >
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="
                  relative
                  h-[220px]
                  w-[145px]
                  shrink-0

                  sm:h-[245px]
                  sm:w-[165px]

                  md:h-[270px]
                  md:w-[180px]
                "
              >
                {/* Rank */}
                <span
                  className="
                    absolute
                    bottom-6
                    -left-5
                    z-10
                    flex
                    items-end
                    justify-center
                    text-[76px]
                    font-black
                    leading-[0.7]
                    text-black
                    [-webkit-text-stroke:2px_white]

                    sm:-left-6
                    sm:text-[88px]

                    md:bottom-8
                    md:-left-7
                    md:text-[100px]
                  "
                >
                  {movie.rank}
                </span>

                {/* Movie Image */}
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="
                    h-full
                    w-full
                    rounded-lg
                    object-cover
                  "
                />
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={scrollRight}
            aria-label="Next movies"
            className="
              absolute
              right-0
              top-1/2
              z-30
              flex
              h-[90px]
              w-[26px]
              -translate-y-1/2
              items-center
              justify-center
              rounded-md
              bg-white/10
              text-white
              backdrop-blur-sm
              transition-all
              duration-200
              hover:bg-white/20
              active:scale-95

              sm:h-[105px]
              sm:w-[30px]

              md:h-[120px]
              md:w-[32px]
            "
          >
            <ChevronRight
              size={24}
              strokeWidth={1.5}
              className="sm:h-7 sm:w-7 md:h-8 md:w-8"
            />
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default Trending;