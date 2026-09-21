import React from "react";

const Topbanner = () => {
  return (
    <div
      className="
        flex
        min-h-12
        w-full
        items-center
        justify-center
        gap-2
        bg-[linear-gradient(90deg,#5B35A8_0%,#A32272_50%,#E50914_100%)]
        px-3
        py-2
        text-center
        text-[13px]
        font-semibold
        text-white

        sm:min-h-12
        sm:px-4
        sm:text-[14px]

        md:gap-2
        md:text-[16px]
      "
    >
      {/* Gift Icon */}
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        role="img"
        className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M8.39 1A3.4 3.4 0 0 0 5 4.39v.11q0 .82.34 1.5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 1 1.73V20c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-8.27A2 2 0 0 0 22 10V8a2 2 0 0 0-2-2h-1.34q.33-.68.34-1.5v-.11a3.39 3.39 0 0 0-6.53-1.26L12 4.3l-.47-1.18A3.4 3.4 0 0 0 8.39 1M12 8h8v2H4V8zm5-3.5c0 .83-.67 1.5-1.5 1.5h-2.02l.85-2.13A1.39 1.39 0 0 1 17 4.4zM10.52 6l-.85-2.13A1.39 1.39 0 0 0 7 4.4v.11C7 5.33 7.67 6 8.5 6zM5 20v-8h6v8zm8 0h6v-8h-6z"
          clipRule="evenodd"
        />
      </svg>

      {/* Text */}
      <p className="leading-5">
        New to Netflix? Try 7 days for ₹0.
      </p>
    </div>
  );
};

export default Topbanner;