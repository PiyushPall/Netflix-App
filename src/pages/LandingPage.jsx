import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Topbanner from "../components/Topbanner";
import Features from "./Card";
import FAQ from "./Faq";
import SignIn from "./SignIn";
import Trending from "./Trending";

const LandingPage = () => {
  return (
    <>
      <Topbanner />
      <Hero/>
      <Trending />
      <Features/>
      <FAQ />
      <Footer />
    </>
  );
};

export default LandingPage;