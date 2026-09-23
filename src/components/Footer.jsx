import React from "react";
import { Languages, ChevronRight } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import Layout from "./Layout";

const Footer = () => {
  return (
    <footer className="bg-black pt-8 pb-10 text-[#b3b3b3] sm:pt-10">
      <Layout>
        {/* Top Membership Section */}
        <div className="mx-auto px-4 sm:px-6">
          <p className="mb-5 text-center text-[15px] text-white sm:text-[16px]">
            Ready to watch? Enter your email to start your membership.
          </p>

          {/* Email + Button */}
          <div className="mx-auto flex w-full max-w-[900px] flex-col justify-center gap-3 sm:flex-row">
            {/* Email Input */}
            <div className="w-full sm:flex-1">
              <input
                type="email"
                placeholder="Email address"
                className="
                  h-14
                  w-full
                  rounded-sm
                  border
                  border-[#5F5F5F]
                  bg-[#161616]
                  pl-4
                  text-[16px]
                  text-white
                  outline-none
                  placeholder:text-[#8c8c8c]
                  focus:border-white
                "
              />
            </div>

            {/* Button */}
            <button
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-sm
                bg-[#e50914]
                px-5
                text-[16px]
                font-bold
                text-white
                transition
                duration-200
                hover:bg-[#c11119]
                sm:w-[250px]
                sm:text-[20px]
                lg:w-[273px]
                lg:text-[24px]
              "
            >
              <span>Try 7 Days for ₹0</span>

              <ChevronRight
                size={28}
                strokeWidth={2}
                className="shrink-0"
              />
            </button>
          </div>
        </div>

        {/* Offer Text */}
        <div className="mx-auto mt-6 max-w-[1360px] px-4 sm:px-6">
          <p className="text-[14px] font-light leading-6 text-[#b3b3b3] sm:text-[16px] sm:leading-7">
            This offer is only valid for new members. This offer is
            non-transferable. You agree that Netflix will charge the membership
            fee at the end of the free trial to your payment method and will
            automatically continue your membership until you cancel. Some
            methods of payment may not be eligible to redeem this offer.
          </p>
        </div>

        {/* Footer Links */}
        <div className="mx-auto mt-14 max-w-[1360px] px-4 sm:mt-16 sm:px-6 md:mt-20">
          {/* Questions */}
          <p className="mb-8 text-[14px] sm:mb-10 sm:text-[16px] md:mb-12">
            Questions? Call{" "}
            <a href="#" className="underline">
              000-800-919-1743
            </a>
          </p>

          {/* Links Grid */}
          <div
            className="
              grid
              grid-cols-2
              gap-x-8
              gap-y-6
              text-[13px]
              sm:gap-x-12
              sm:gap-y-5
              sm:text-[14px]
              lg:grid-cols-4
            "
          >
            {/* Column 1 */}
            <div className="flex flex-col gap-5">
              <a href="#" className="underline hover:text-white">
                FAQ
              </a>

              <a href="#" className="underline hover:text-white">
                Investor Relations
              </a>

              <a href="#" className="underline hover:text-white">
                Privacy
              </a>

              <a href="#" className="underline hover:text-white">
                Speed Test
              </a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-5">
              <a href="#" className="underline hover:text-white">
                Help Centre
              </a>

              <a href="#" className="underline hover:text-white">
                Jobs
              </a>

              <a href="#" className="underline hover:text-white">
                Cookie Preferences
              </a>

              <a href="#" className="underline hover:text-white">
                Legal Notices
              </a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-5">
              <a href="#" className="underline hover:text-white">
                Account
              </a>

              <a href="#" className="underline hover:text-white">
                Ways to Watch
              </a>

              <a href="#" className="underline hover:text-white">
                Corporate Information
              </a>

              <a href="#" className="underline hover:text-white">
                Only on Netflix
              </a>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-5">
              <a href="#" className="underline hover:text-white">
                Media Centre
              </a>

              <a href="#" className="underline hover:text-white">
                Terms of Use
              </a>

              <a href="#" className="underline hover:text-white">
                Contact Us
              </a>
            </div>
          </div>

          {/* Language Select */}
          <div className="relative mt-12 inline-flex items-center sm:mt-14 md:mt-[70px]">
            <Languages
              className="pointer-events-none absolute left-3 z-10 h-4 w-4 text-white"
            />

            <select
              className="
                h-9
                w-[130px]
                appearance-none
                rounded-md
                border
                border-[#5f5f5f]
                bg-black
                pl-10
                pr-10
                text-[14px]
                text-white
                outline-none
                focus:border-white
                sm:h-8
                sm:w-auto
                sm:text-[16px]
              "
            >
              <option className="text-black">English</option>
              <option className="text-black">Hindi</option>
            </select>

            <FaCaretDown
              className="
                pointer-events-none
                absolute
                right-3
                text-[12px]
                text-white
              "
            />
          </div>

          {/* Netflix India */}
          <p className="mt-10 text-[13px] sm:mt-12 sm:text-[14px]">
            Netflix India
          </p>

          {/* reCAPTCHA */}
          <p className="mt-8 max-w-[700px] text-[12px] leading-5 text-[#8c8c8c] sm:mt-10 sm:text-[13px]">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
        </div>
      </Layout>
    </footer>
  );
};

export default Footer;