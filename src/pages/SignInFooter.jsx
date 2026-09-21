import React from "react";
import { Languages, ChevronDown } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { ChevronRight } from 'lucide-react';
const SignInFooter = () => {
  return (
    <footer className="bg-black px-[12%] py-18 text-[#b3b3b3]">
      
      {/* Contact */}
      <p className="mb-8 text-[16px]">
        Questions? Call{" "}
        <a
          href="tel:0008009191743"
          className="underline"
        >
          000-800-919-1743 (Toll-Free)
        </a>
      </p>

      {/* Footer Links */}
      <div className="grid grid-cols-4 gap-y-3">
        
        <a href="#" className="text-[14px] underline">
          FAQ
        </a>

        <a href="#" className="text-[14px] underline">
          Help Centre
        </a>

        <a href="#" className="text-[14px] underline">
          Terms of Use
        </a>

        <a href="#" className="text-[14px] underline">
          Privacy
        </a>

        <a href="#" className="text-[14px] underline">
          Cookie Preferences
        </a>

        <a href="#" className="text-[14px] underline">
          Corporate Information
        </a>

      </div>

      {/* Language Selector */}
          <div className="relative mt-17.5 inline-flex items-center">
            <Languages className="pointer-events-none absolute left-3 z-10 h-4 w-4 text-white" />

            <select className="h-8 appearance-none rounded-md border border-[#5f5f5f] pl-10 pr-10 text-[16px] text-white outline-none focus:border-white">
              <option className="text-black">English</option>
              <option className="text-black">Hindi</option>
            </select>

            <FaCaretDown className="pointer-events-none absolute right-3 text-[12px] text-white" />
          </div>

    </footer>
  );
};

export default SignInFooter;