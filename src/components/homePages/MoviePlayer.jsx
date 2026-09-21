import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Play,
    Pause,
    Plus,
    Check,
    Star,
} from "lucide-react";
import {
    addToMyList,
    removeFromMyList,
    isInMyList,
} from "../Utils/mylist";

const MoviePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const playerRef = useRef(null);

    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [addedToList, setAddedToList] = useState(false);

    // =====================================
    // 1. FETCH MOVIE + TRAILER
    // =====================================

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const token = import.meta.env.VITE_TMDB_TOKEN;

                // Movie details
                const movieResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            accept: "application/json",
                        },
                    },
                );

                const movieData = await movieResponse.json();

                setMovie(movieData);

                // Movie videos
                const videoResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            accept: "application/json",
                        },
                    },
                );

                const videoData = await videoResponse.json();

                console.log("VIDEO DATA:", videoData.results);

                // Trailer find karo
                const selectedTrailer =
                    videoData.results?.find(
                        (video) =>
                            video.site === "YouTube" &&
                            video.type === "Trailer" &&
                            video.official === true,
                    ) ||
                    videoData.results?.find(
                        (video) =>
                            video.site === "YouTube" &&
                            video.type === "Trailer",
                    ) ||
                    videoData.results?.find(
                        (video) =>
                            video.site === "YouTube" &&
                            video.type === "Teaser",
                    ) ||
                    videoData.results?.find(
                        (video) => video.site === "YouTube",
                    );

                console.log("SELECTED TRAILER:", selectedTrailer);

                setTrailer(selectedTrailer || null);
            } catch (error) {
                console.error("Movie Error:", error);
            }
        };

        fetchMovie();
    }, [id]);

    // =====================================
    // 2. YOUTUBE IFRAME API
    // =====================================

    useEffect(() => {
        if (!trailer?.key) return;

        const createPlayer = () => {
            if (!window.YT || !window.YT.Player) return;

            // Old player destroy
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }

            playerRef.current = new window.YT.Player("youtube-player", {
                videoId: trailer.key,

                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                },

                events: {
                    onReady: () => {
                        console.log("YouTube Player Ready");
                        setIsPlaying(false);
                    },

                    onStateChange: (event) => {
                        if (
                            event.data ===
                            window.YT.PlayerState.PLAYING
                        ) {
                            setIsPlaying(true);
                        }

                        if (
                            event.data ===
                            window.YT.PlayerState.PAUSED
                        ) {
                            setIsPlaying(false);
                        }

                        if (
                            event.data ===
                            window.YT.PlayerState.ENDED
                        ) {
                            setIsPlaying(false);
                        }
                    },
                },
            });
        };

        // Agar YouTube API already loaded hai
        if (window.YT && window.YT.Player) {
            createPlayer();
            return;
        }

        // YouTube API load karo
        const existingScript = document.querySelector(
            'script[src="https://www.youtube.com/iframe_api"]',
        );

        if (!existingScript) {
            const script = document.createElement("script");

            script.src =
                "https://www.youtube.com/iframe_api";

            document.body.appendChild(script);
        }

        // API ready hone ke baad player create hoga
        window.onYouTubeIframeAPIReady = createPlayer;

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [trailer]);

    // =====================================
    // 3. PLAY / PAUSE
    // =====================================

    const handlePlayPause = () => {
        if (!playerRef.current) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    // =====================================
    // 4. ADD TO LIST
    // =====================================

    // const handleAddToList = () => {
    //     setAddedToList((prev) => !prev);
    // };
    const handleAddToList = () => {
        console.log("ADD BUTTON CLICKED");
        console.log("CURRENT MOVIE:", movie);

        if (!movie) {
            console.log("MOVIE NOT FOUND");
            return;
        }

        if (addedToList) {
            removeFromMyList(movie.id);
            setAddedToList(false);

            console.log("REMOVED:", movie.title);
        } else {
            addToMyList(movie);
            setAddedToList(true);

            console.log("ADDED:", movie.title);
        }
    };

    useEffect(() => {
        if (!movie) return;

        setAddedToList(isInMyList(movie.id));
    }, [movie]);
    // =====================================
    // LOADING
    // =====================================

    if (!movie) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    // =====================================
    // UI
    // =====================================

    return (
        <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">

            {/* =====================================
          MOVIE CARD
      ===================================== */}

            <div
                className="
          mx-auto
          w-full
          max-w-[1200px]
          overflow-hidden
          rounded-2xl
          bg-[#111]
          shadow-2xl
          mt-14
        "
            >
                {/* =====================================
            VIDEO
        ===================================== */}

                <div
                    className="
            relative
            aspect-video
            w-full
            overflow-hidden
            bg-black
          "
                >
                    {trailer ? (
                        <>
                            {/* YouTube Player */}

                            <div
                                id="youtube-player"
                                className="absolute inset-0 h-full w-full"
                            />

                            {/* Custom Play / Pause */}
                        </>
                    ) : (
                        /* =====================================
                           NO TRAILER
                        ===================================== */

                        <div className="relative h-full w-full">
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-lg text-gray-300">
                                    Trailer not available
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* =====================================
            MOVIE INFORMATION
        ===================================== */}

                <div className="p-6 md:p-8">
                    {/* Title */}

                    <h1 className="text-3xl font-bold md:text-4xl">
                        {movie.title}
                    </h1>

                    {/* Meta */}

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        {movie.release_date && (
                            <span>
                                {movie.release_date.slice(0, 4)}
                            </span>
                        )}

                        {movie.runtime > 0 && (
                            <>
                                <span>•</span>

                                <span>
                                    {Math.floor(movie.runtime / 60)}h{" "}
                                    {movie.runtime % 60}m
                                </span>
                            </>
                        )}

                        <span>•</span>

                        <span className="rounded border border-gray-500 px-2 py-0.5">
                            HD
                        </span>

                        <span className="flex items-center gap-1 text-yellow-400">
                            <Star
                                size={15}
                                fill="currentColor"
                            />

                            {movie.vote_average?.toFixed(1)}
                        </span>
                    </div>

                    {/* Buttons */}

                    <div className="mt-6 flex flex-wrap gap-3">
                        {/* Play / Pause */}

                        {trailer && (
                            <button
                                onClick={handlePlayPause}
                                className="
                  flex
                  items-center
                  gap-2
                  rounded-md
                  bg-white
                  px-6
                  py-3
                  font-semibold
                  text-black
                  transition
                  hover:bg-gray-200
                "
                            >
                                {isPlaying ? (
                                    <>
                                        <Pause
                                            size={19}
                                            fill="currentColor"
                                        />
                                        Pause
                                    </>
                                ) : (
                                    <>
                                        <Play
                                            size={19}
                                            fill="currentColor"
                                        />
                                        Play
                                    </>
                                )}
                            </button>
                        )}

                        {/* Add To List */}

                        <button
                            onClick={handleAddToList}
                            className="
                flex
                items-center
                gap-2
                rounded-md
                bg-[#2a2a2a]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#3a3a3a]
              "
                        >
                            {addedToList ? (
                                <>
                                    <Check size={19} />
                                    Added to List
                                </>
                            ) : (
                                <>
                                    <Plus size={19} />
                                    Add to List
                                </>
                            )}
                        </button>
                    </div>

                    {/* Overview */}

                    {movie.overview && (
                        <p className="mt-7 max-w-[850px] text-[16px] leading-7 text-gray-300">
                            {movie.overview}
                        </p>
                    )}

                    {/* Genres */}

                    {movie.genres?.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="
                    rounded-full
                    bg-white/10
                    px-4
                    py-2
                    text-sm
                    text-gray-300
                  "
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default MoviePlayer;