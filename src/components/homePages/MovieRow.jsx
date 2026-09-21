import HomeLayout from "../HomeLayout";

const MovieRow = ({ title, movies = [] }) => {
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
          {title}
        </h2>

        {/* Movie Cards */}
        <div
          className="
            flex
            gap-2
            overflow-x-auto
            overflow-y-hidden
            scrollbar-none
            pt-1
            pb-10
            sm:gap-3
            sm:pb-12
            md:gap-4
            md:pb-15
          "
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="
                group
                relative
                h-[210px]
                w-[140px]
                shrink-0
                overflow-hidden
                rounded-lg
                transition-all
                duration-300
                ease-out

                hover:z-50
                hover:scale-105

                sm:h-[240px]
                sm:w-[160px]
                sm:rounded-xl
                sm:hover:scale-110

                md:h-67.5
                md:w-45
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
                onClick={() =>
                  (window.location.href = `/movies/${movie.id}`)
                }
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
                    ml-0.5
                    h-0
                    w-0
                    border-y-[9px]
                    border-y-transparent
                    border-l-[14px]
                    border-l-white

                    sm:border-y-[10px]
                    sm:border-l-[16px]

                    md:ml-1
                    md:border-y-12
                    md:border-l-18
                  "
                />
              </button>

              {/* Bottom Gradient */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-24
                  bg-linear-to-t
                  from-black/90
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100

                  md:h-28
                "
              />

              {/* Movie Title */}
              <div
                className="
                  absolute
                  bottom-3
                  left-3
                  right-2
                  translate-y-3
                  text-[14px]
                  font-bold
                  leading-tight
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

export default MovieRow;