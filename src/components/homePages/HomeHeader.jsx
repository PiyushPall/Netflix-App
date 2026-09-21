import React from "react";
import HomeLayout from "../HomeLayout";
import Logo from "../../../public/Netflix-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, ChevronDown, LogOut, X, Menu } from "lucide-react";
import { IoNotifications } from "react-icons/io5";
import Profile from "../../../public/profile-image.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchMoviesAndShows from "../Utils/searchAPI.js"
import { useAuth } from "../Utils/AuthContext.jsx"
const HomeHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const displayName = user?.email
    ?.split("@")[0]
    .replace(/[._-]/g, " ")
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchLoading(true);

      const results = await searchMoviesAndShows(searchQuery);

      setSearchResults(results);
      setSearchLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);




  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black">
      <HomeLayout>
        <div className="relative flex h-20 items-center justify-between px-4 md:h-22 md:px-8 lg:px-10">

          {/* ================= LEFT SIDE ================= */}
          <div className="flex min-w-0 items-center gap-6 lg:gap-12">

            {/* Logo */}
            <Link to="/home" className="shrink-0">
              <img
                src={Logo}
                alt="Netflix"
                className="h-auto w-24 sm:w-28 md:w-32 lg:w-36"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className={`${searchOpen ? "hidden" : "hidden lg:flex"
                } items-center gap-5 text-[14px] font-medium text-[#d2d2d2] lg:gap-7 lg:text-[15px]`}
            >

              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "transition-colors hover:text-white"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "transition-colors hover:text-white"
                }
              >
                Movies
              </NavLink>

              <NavLink
                to="/tv-shows"
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "transition-colors hover:text-white"
                }
              >
                TV Shows
              </NavLink>

              <NavLink
                to="/new-popular"
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "transition-colors hover:text-white"
                }
              >
                New & Popular
              </NavLink>

              <NavLink
                to="/mylist"
                className={({ isActive }) =>
                  isActive
                    ? "text-white"
                    : "transition-colors hover:text-white"
                }
              >
                My List
              </NavLink>

            </nav>
          </div>


          {/* ================= RIGHT SIDE ================= */}
          <div className="flex shrink-0 items-center gap-3 text-white sm:gap-4 md:gap-5 lg:gap-6">

            {/* ================= SEARCH ================= */}
            <div className="relative flex items-center">

              {/* Search Input Box */}
              <div
                className={`absolute right-9 top-1/2 z-[60] flex h-9 -translate-y-1/2 items-center border border-white bg-black transition-all duration-300 ${searchOpen
                  ? "w-[220px] opacity-100 sm:w-[280px] md:w-[320px]"
                  : "pointer-events-none w-0 border-transparent opacity-0"
                  }`}
              >
                <Search
                  size={20}
                  className="ml-3 shrink-0 text-white"
                />

                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  className="w-full min-w-0 bg-transparent px-3 text-sm text-white outline-none placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus={searchOpen}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setSearchOpen(false);
                      setSearchQuery("");
                      setSearchResults([]);
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="mr-2 shrink-0 text-white"
                >
                  <X size={18} />
                </button>
              </div>


              {/* Search Results Dropdown */}
              {searchOpen && searchQuery.trim() && (
                <div
                  className="
                absolute right-0 top-12 z-[70]
                w-[calc(100vw-32px)]
                max-w-[400px]
                overflow-hidden
                rounded-md
                border border-white/10
                bg-[#181818]
                shadow-2xl
              "
                >
                  {searchLoading && (
                    <div className="px-5 py-4 text-sm text-gray-400">
                      Searching...
                    </div>
                  )}

                  {!searchLoading && searchResults.length === 0 && (
                    <div className="px-5 py-6 text-center">
                      <p className="text-sm text-gray-300">
                        No titles found
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Try another movie or TV show
                      </p>
                    </div>
                  )}

                  {!searchLoading && searchResults.length > 0 && (
                    <div className="max-h-[420px] overflow-y-auto">
                      {searchResults.map((item) => (
                        <SearchResult
                          key={`${item.media_type}-${item.id}`}
                          item={item}
                          onSelect={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}


              {/* Search Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="relative z-[80] text-white"
              >
                <Search size={22} />
              </button>

            </div>


            {/* ================= NOTIFICATION ================= */}
            <button className="flex items-center justify-center">
              <IoNotifications className="text-[20px] sm:text-[22px]" />
            </button>


            {/* ================= PROFILE ================= */}
            <div className="relative hidden sm:block">

              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={Profile}
                  alt="Profile"
                  className="h-8 w-8 rounded-sm object-cover sm:h-9 sm:w-9 md:h-10 md:w-10"
                />

                <ChevronDown
                  size={17}
                  className={`text-white transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                    }`}
                  strokeWidth={2.5}
                />
              </button>


              {/* Profile Dropdown */}
              <div
                className={`absolute top-12 right-0 z-50
    w-[calc(100vw-32px)]
    max-w-[320px]
    rounded-[28px]
    border border-white/15
    bg-[#17181C]
    p-5
    shadow-2xl
    transition-all duration-200
    md:p-6
    ${profileOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                  }
  `}
              >

                {/* Account */}
                <div className="flex items-center gap-4">

                  <img
                    src={Profile}
                    alt="Profile"
                    className="h-8 w-8 rounded-md object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-white">
                      {displayName}
                    </p>

                    <p className="truncate text-[14px] text-gray-400">
                      {user?.email}
                    </p>
                  </div>

                </div>


                {/* Divider */}
                <div className="my-5 h-px bg-white/10" />


                {/* Account */}
                <Link
                  to="/account"
                  className="
                flex w-full items-center
                rounded-lg px-4 py-3
                text-left text-[14px]
                text-gray-300
                transition
                hover:bg-[#232428]
              "
                >
                  Account
                </Link>


                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="
                mt-3 flex w-full items-center gap-2
                rounded-lg px-4 py-3
                text-[14px]
                text-gray-300
                transition
                hover:bg-[#232428]
              "
                >
                  <LogOut
                    size={18}
                    strokeWidth={1.8}
                  />

                  <span>Sign out</span>
                </button>

              </div>

            </div>


            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center text-white sm:hidden"
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

          </div>


          {/* ================= MOBILE MENU ================= */}
          {mobileMenuOpen && (
            <div
              className="
            absolute
            top-full
            left-0
            z-[100]
            w-full
            border-t
            border-white/10
            bg-[#111111]
            px-5
            py-6
            shadow-2xl
            sm:hidden
          "
            >

              <nav className="flex flex-col gap-5 text-[15px] font-medium text-[#d2d2d2]">

                <NavLink
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white"
                      : "transition-colors hover:text-white"
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/movies"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white"
                      : "transition-colors hover:text-white"
                  }
                >
                  Movies
                </NavLink>

                <NavLink
                  to="/tv-shows"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white"
                      : "transition-colors hover:text-white"
                  }
                >
                  TV Shows
                </NavLink>

                <NavLink
                  to="/new-popular"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white"
                      : "transition-colors hover:text-white"
                  }
                >
                  New & Popular
                </NavLink>

                <NavLink
                  to="/mylist"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white"
                      : "transition-colors hover:text-white"
                  }
                >
                  My List
                </NavLink>

                {/* Mobile Account */}
                <div className="my-1 h-px bg-white/10" />

                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#d2d2d2] transition-colors hover:text-white"
                >
                  Account
                </Link>

                {/* Mobile Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-left text-[#d2d2d2] transition-colors hover:text-white"
                >
                  <LogOut size={18} />

                  <span>Sign out</span>
                </button>

              </nav>

            </div>
          )}

        </div>
      </HomeLayout>
    </header>


  );
};

export default HomeHeader;


const SearchResult = ({ item, onSelect }) => {
  const navigate = useNavigate();

  const title = item.title || item.name;

  const releaseDate =
    item.release_date || item.first_air_date;

  const year = releaseDate
    ? new Date(releaseDate).getFullYear()
    : "";

  const handleClick = () => {
    onSelect?.();

    if (item.media_type === "tv") {
      navigate(`/movies/${item.id}`);
    } else {
      navigate(`/movies/${item.id}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        flex
        w-full
        gap-3
        border-b
        border-white/5
        bg-[#181818]
        p-3
        text-left
        transition
        hover:bg-[#2a2a2a]
      "
    >
      {/* Poster */}
      <img
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
            : "/placeholder.jpg"
        }
        alt={title}
        className="
          h-[72px]
          w-[48px]
          shrink-0
          rounded-sm
          object-cover
        "
      />

      {/* Details */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {title}
        </p>

        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
          <span>
            {item.media_type === "tv"
              ? "TV Show"
              : "Movie"}
          </span>

          {year && (
            <>
              <span>•</span>
              <span>{year}</span>
            </>
          )}
        </div>

        {item.vote_average > 0 && (
          <p className="mt-2 text-xs text-gray-500">
            ⭐ {item.vote_average.toFixed(1)}
          </p>
        )}
      </div>
    </button>
  );
};