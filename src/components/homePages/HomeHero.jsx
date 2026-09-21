import { useEffect, useRef, useState } from "react";
import { Play, Pause, Info } from "lucide-react";
import HomeLayout from "../HomeLayout";

const HomeHero = ({ movie, type = "movie" }) => {
  const playerRef = useRef(null);

  const [trailer, setTrailer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // =========================
  // FETCH TRAILER
  // =========================
  useEffect(() => {
    if (!movie?.id) return;

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${movie.id}/videos`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              accept: "application/json",
            },
          },
        );

        const data = await response.json();

        const trailerVideo =
          data.results?.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer" &&
              video.official === true,
          ) ||
          data.results?.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer",
          ) ||
          data.results?.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Teaser",
          ) ||
          data.results?.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Clip",
          ) ||
          data.results?.find(
            (video) => video.site === "YouTube",
          );

        setTrailer(trailerVideo || null);
        setIsPlaying(false);
      } catch (error) {
        console.error("Trailer Error:", error);
        setTrailer(null);
        setIsPlaying(false);
      }
    };

    fetchTrailer();
  }, [movie, type]);

  // =========================
  // LOAD YOUTUBE IFRAME API
  // =========================
  useEffect(() => {
    if (!trailer) return;

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: trailer.key,

        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: trailer.key,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
        },

        events: {
          onReady: (event) => {
            event.target.pauseVideo();
          },

          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            }

            if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );

      if (!existingScript) {
        const script = document.createElement("script");

        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;

        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [trailer]);

  // =========================
  // PLAY / PAUSE
  // =========================
  const handlePlayPause = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // =========================
  // LOADING
  // =========================
  if (!movie) {
    return (
      <section className="h-[550px] bg-black sm:h-[620px] md:h-[680px] lg:h-[700px]" />
    );
  }

  return (
    <section
      className="
        relative
        h-[550px]
        overflow-hidden
        bg-black
        sm:h-[620px]
        md:h-[680px]
        lg:h-[700px]
      "
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================= */}
      {!trailer && movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || movie.name}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />
      )}

      {/* =========================
          YOUTUBE TRAILER
      ========================= */}
      {trailer && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            id="youtube-player"
            className="
              pointer-events-none
              absolute
              top-1/2
              left-1/2
              h-[125%]
              w-[125%]
              -translate-x-1/2
              -translate-y-1/2
            "
          />
        </div>
      )}

      {/* =========================
          DARK OVERLAY
      ========================= */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />

      {/* =========================
          BOTTOM GRADIENT
      ========================= */}
      <div
        className="
          pointer-events-none
          absolute
          right-0
          bottom-0
          left-0
          h-48
          bg-gradient-to-t
          from-black
          via-black/60
          to-transparent
          sm:h-56
          md:h-64
        "
      />

      {/* =========================
          CONTENT
      ========================= */}
      <div className="relative z-10 flex h-full items-center">
        <HomeLayout>
          <div
            className="
              max-w-[600px]
              text-white
            "
          >
            {/* TITLE */}
            <h1
              className="
                max-w-[340px]
                text-[34px]
                font-bold
                leading-[1.1]
                sm:max-w-[500px]
                sm:text-[44px]
                md:text-[52px]
                lg:max-w-[600px]
                lg:text-[56px]
              "
            >
              {movie.title || movie.name}
            </h1>

            {/* OVERVIEW */}
            {movie.overview && (
              <p
                className="
                  mt-4
                  line-clamp-3
                  max-w-[500px]
                  text-[14px]
                  leading-6
                  text-gray-200
                  sm:mt-5
                  sm:text-[15px]
                  sm:leading-6
                  md:text-[16px]
                  md:leading-7
                  lg:text-[17px]
                "
              >
                {movie.overview}
              </p>
            )}

            {/* BUTTONS */}
            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-2
                sm:mt-7
                sm:gap-3
              "
            >
              {/* PLAY / PAUSE */}
              <button
                type="button"
                onClick={handlePlayPause}
                disabled={!trailer}
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded
                  bg-white
                  px-5
                  text-sm
                  font-semibold
                  text-black
                  transition-all
                  duration-200
                  hover:bg-gray-200
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:h-12
                  sm:px-6
                  sm:text-base
                  md:px-7
                "
              >
                {isPlaying ? (
                  <>
                    <Pause
                      size={18}
                      fill="currentColor"
                      className="sm:h-5 sm:w-5"
                    />
                    Pause
                  </>
                ) : (
                  <>
                    <Play
                      size={18}
                      fill="currentColor"
                      className="sm:h-5 sm:w-5"
                    />
                    Play
                  </>
                )}
              </button>

              {/* MORE INFO */}
              <button
                type="button"
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded
                  bg-gray-500/80
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-gray-500
                  sm:h-12
                  sm:px-6
                  sm:text-base
                  md:px-7
                "
              >
                <Info
                  size={18}
                  className="sm:h-5 sm:w-5"
                />
                More Info
              </button>
            </div>
          </div>
        </HomeLayout>
      </div>
    </section>
  );
};

export default HomeHero;