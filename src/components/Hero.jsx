import Main from "../../public/Hero-img.jpg";
import Header from "./Header";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="
        relative
        min-h-[650px]
        overflow-hidden

        sm:min-h-[700px]
        md:min-h-[750px]
        lg:min-h-[800px]
      "
    >
      {/* Background */}
      <img
        src={Main}
        alt=""
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Foreground */}
      <div className="relative z-10 min-h-screen">
        {/* Navbar */}
        <Header />

        {/* Hero Content */}
        <div
          className="
            flex
            flex-col
            items-center
            px-4
            pt-[90px]
            text-center
            text-white

            sm:px-6
            sm:pt-[110px]

            md:pt-[130px]

            lg:px-0
            lg:pt-[150px]
          "
        >
          {/* Main Heading */}
          <h1
            className="
              max-w-[1000px]
              text-[36px]
              font-bold
              leading-[1.1]
              tracking-[-1px]

              sm:text-[44px]
              sm:tracking-[-1.2px]

              md:text-[52px]

              lg:text-[56px]
              lg:tracking-[-1.5px]
            "
          >
            Unlimited movies,
            <br />
            shows, and more
          </h1>

          {/* Subtitle */}
          <p
            className="
              mt-4
              mb-6
              text-[16px]
              font-semibold
              leading-normal

              sm:text-[18px]
              sm:mb-7

              md:text-[20px]
              md:mb-8
            "
          >
            Plans start at ₹149. Cancel anytime.
          </p>

          {/* Description */}
          <p
            className="
              max-w-[500px]
              text-[14px]
              font-normal
              leading-5

              sm:text-[15px]

              md:text-[16px]
              md:leading-normal
            "
          >
            Ready to watch? Enter your email to start your membership.
          </p>

          {/* Email Form */}
          <div
            className="
              mt-4
              flex
              w-full
              max-w-[580px]
              flex-col
              items-center
              gap-3

              sm:mt-5

              md:flex-row
              md:max-w-[591px]
            "
          >
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email address"
              className="
                h-[56px]
                w-full
                rounded-[4px]
                border
                border-[#5f5f5f]
                bg-black/40
                px-5
                text-[16px]
                text-white
                outline-none
                placeholder:text-[#b3b3b3]
                focus:border-white

                md:w-[306px]
                md:px-6
              "
            />

            {/* Button */}
            <button
              className="
                flex
                h-[56px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-[4px]
                bg-[#e50914]
                px-5
                text-[19px]
                font-bold
                text-white
                transition
                duration-200
                hover:bg-[#c11119]

                sm:text-[21px]

                md:w-[273px]
                md:px-0
                md:text-[24px]
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

          {/* Bottom Text */}
          <p
            className="
              mt-5
              text-[13px]
              font-normal
              text-[#b3b3b3]

              sm:mt-6
              sm:text-[14px]

              md:text-[16px]
            "
          >
            New members only. Terms below.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;