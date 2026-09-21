import React from 'react'

const HomeLayout = ({ children }) => {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1400px]
        px-4
        sm:px-6
        md:px-8
        lg:px-10
        xl:px-12
      "
    >
      {children}
    </div>
  );
};

export default HomeLayout;