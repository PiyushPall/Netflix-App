import React, { useState } from "react";
import Topbanner from "./components/Topbanner";
import Hero from "./components/Hero";
import Trending from "./pages/Trending";
import Features from "./pages/Card";
import FAQ from "./pages/Faq";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import SignInFooter from "./pages/SignInFooter";
import HomeHeader from "./components/homePages/HomeHeader";
import HomeHero from "./components/homePages/HomeHero";
// import HomeTrending from "./components/homePages/HomeTrending";
import TopRated from "./components/homePages/TopRated";
import MovieRow from "./components/homePages/MovieRow";
import MovieRowApi from "./components/homePages/MovieRowApi";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import HomeMovies from "./components/homePages/HomeMovies";
// import Home from "./components/homePages/Home";
import TVShows from "./components/homePages/TvShows";
import NewPopular from "./components/homePages/NewPopular";
import LandingPage from "./pages/LandingPage";
import Home from "./components/homePages/Home";
import MoviePlayer from "./components/homePages/MoviePlayer";
import MyList from "./components/homePages/MyList";
import ProtectedRoute from "./pages/ProtectedRoutes";
import Account from "./pages/Account";
const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={
          <ProtectedRoute>

            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/home" element={<Home />} />

          <Route path="/movies" element={<HomeMovies />} />
          <Route path="/movies/:id" element={<MoviePlayer />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/new-popular" element={<NewPopular />} />
          <Route path="/mylist" element={<MyList />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

        </Route>
      </Routes>
    </>
  );
};

export default App;
