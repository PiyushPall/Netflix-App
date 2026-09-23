import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import HomeLayout from "../HomeLayout";
import {
  getMyList,
  removeFromMyList,
} from "../Utils/mylist";

const MyList = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    setMyList(getMyList());
  }, []);

  const handleRemove = (movieId) => {
    removeFromMyList(movieId);

    setMyList((prev) =>
      prev.filter((movie) => movie.id !== movieId),
    );
  };

  return (
    <main
      className="
        min-h-screen
        bg-black
        pt-24
        pb-12
        sm:pt-28
        sm:pb-16
        md:pt-32
        md:pb-20
      "
    >
      <HomeLayout>
        {/* Header */}

        <div className="mb-6 sm:mb-8">
          <h1
            className="
              text-2xl
              font-bold
              text-white
              sm:text-3xl
              md:text-4xl
            "
          >
            My List
          </h1>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-gray-400
              sm:mt-2
              sm:text-sm
            "
          >
            Movies and shows you've added to your list
          </p>
        </div>

        {/* Empty State */}

        {myList.length === 0 && (
          <div
            className="
              flex
              min-h-[300px]
              items-center
              justify-center
              px-4
              sm:min-h-[350px]
              md:min-h-[400px]
            "
          >
            <div className="text-center">
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  sm:h-20
                  sm:w-20
                "
              >
                <Play
                  size={28}
                  className="text-gray-400 sm:h-[35px] sm:w-[35px]"
                />
              </div>

              <h2
                className="
                  mt-4
                  text-xl
                  font-semibold
                  text-white
                  sm:mt-5
                  sm:text-2xl
                "
              >
                Your list is empty
              </h2>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-[300px]
                  text-sm
                  leading-5
                  text-gray-400
                  sm:max-w-none
                "
              >
                Add movies and TV shows to see them here.
              </p>
            </div>
          </div>
        )}

        {/* Movie Grid */}

        {myList.length > 0 && (
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              sm:gap-4
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
            "
          >
            {myList.map((movie) => (
              <div
                key={movie.id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-md
                  bg-[#181818]
                  transition-all
                  duration-300
                  hover:z-20
                  hover:scale-105
                "
              >
                {/* Poster */}

                <Link to={`/movies/${movie.id}`}>
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>
                </Link>

                {/* Hover Overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/20
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                {/* Remove */}

                <button
                  type="button"
                  onClick={() => handleRemove(movie.id)}
                  className="
                    absolute
                    top-2
                    right-2
                    z-10
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-black/70
                    text-white
                    opacity-0
                    transition
                    group-hover:opacity-100
                    hover:bg-white
                    hover:text-black
                    sm:top-3
                    sm:right-3
                    sm:h-8
                    sm:w-8
                  "
                  title="Remove from My List"
                >
                  <X
                    size={15}
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                </button>

                {/* Bottom Content */}

                <div
                  className="
    absolute
    right-0
    bottom-0
    left-0
    z-10
    p-2
    opacity-100
    transition-all
    duration-300
    sm:translate-y-3
    sm:opacity-0
    sm:p-3
    sm:group-hover:translate-y-0
    sm:group-hover:opacity-100
  "
                >
                  <h3
                    className="
                      truncate
                      text-xs
                      font-semibold
                      text-white
                      sm:text-sm
                    "
                  >
                    {movie.title || movie.name}
                  </h3>

                  <div className="mt-1.5 flex items-center gap-2 sm:mt-2">
                    {/* Play Button */}

                    <Link
                      to={`/movies/${movie.id}`}
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-black
                        transition
                        hover:scale-110
                        sm:h-8
                        sm:w-8
                      "
                      title="Play"
                    >
                      <Play
                        size={13}
                        fill="currentColor"
                        className="sm:h-[15px] sm:w-[15px]"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </HomeLayout>
    </main>
  );
};

export default MyList;