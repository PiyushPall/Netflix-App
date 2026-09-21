import { Outlet } from "react-router-dom";
import HomeHeader from "../components/homePages/HomeHeader";
// import HomeHeader from "../components/homePages/HomeHero";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-black">
      <HomeHeader />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;