import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Logo from "../../public/Netflix-logo.svg";
import { Languages } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";

const Header = () => {
  return (
    <Layout>
      <div className="my-6 flex items-center justify-between gap-2">
        
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src={Logo}
            alt="Netflix"
            className="h-auto w-[100px] sm:w-[120px] md:w-[148px]"
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

          {/* Language */}
          <div
            className="
              relative flex h-8 w-[82px] shrink-0 items-center
              rounded-sm border border-[#5f5f5f]
              bg-black/40 text-white
              sm:w-[100px]
              md:w-[124px]
            "
          >
            <Languages
              className="
                pointer-events-none absolute left-2 z-10
                h-3.5 w-3.5
                sm:h-4 sm:w-4
              "
            />

            <select
              defaultValue="english"
              className="
                h-full w-full cursor-pointer appearance-none
                bg-transparent pl-7 pr-5
                text-[11px] font-medium outline-none
                sm:pl-8 sm:text-[12px]
                md:text-sm
              "
            >
              <option value="english" className="bg-white text-black">
                English
              </option>

              <option value="hindi" className="bg-white text-black">
                Hindi
              </option>
            </select>

            <FaCaretDown
              className="
                pointer-events-none absolute right-1.5 z-10
                text-[9px]
                sm:right-2 sm:text-[11px]
              "
            />
          </div>

          {/* Sign In */}
          <Link
            to="/signin"
            className="
              inline-flex h-8 w-[65px] shrink-0
              items-center justify-center
              rounded-sm bg-[#e50914]
              text-[12px] font-semibold text-white
              transition-all duration-200
              hover:bg-[#c11119]
              active:scale-[0.98]

              sm:w-[70px] sm:text-[13px]
              md:h-8 md:w-[76.9px] md:text-[14px]
            "
          >
            Sign In
          </Link>

        </div>
      </div>
    </Layout>
  );
};

export default Header;