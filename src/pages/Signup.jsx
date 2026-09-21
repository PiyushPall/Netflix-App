import React, { useState } from "react";
import Layout from "../components/Layout";
import Logo from "../../public/Netflix-logo.svg";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../components/Utils/authApi";

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            const data = await signupUser({
                email,
                password,
                confirmPassword,
            });

            setSuccess("Signup successful! Redirecting to sign in...");

            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/signin");
            }, 1000);
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-dvh w-full bg-gradient-to-br from-[#4b1515] via-[#260b0b] to-[#170404] text-white">
            {/* Header */}
            <div className="border-b border-[#4a282a]">
                <Layout>
                    <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 lg:px-12">
                        <img
                            src={Logo}
                            alt="Netflix"
                            className="h-auto w-[110px] sm:w-[125px] md:w-[148px]"
                        />
                    </div>
                </Layout>
            </div>

            {/* Main */}
            <div className="text-white">
                <div
                    className="
            mx-auto
            flex
            w-full
            max-w-[1150px]
            flex-col
            items-center
            px-4
            pt-6
            sm:px-6
            sm:pt-8
            md:px-8
            md:pt-10
          "
                >
                    {/* Form Container */}
                    <div
                        className="
              flex
              w-full
              max-w-[480px]
              flex-col
            "
                    >
                        {/* Heading */}
                        <div className="flex flex-col items-start justify-start">
                            <h1
                                className="
                  text-[26px]
                  font-bold
                  leading-tight
                  sm:text-[30px]
                  md:text-[32px]
                "
                            >
                                Create your account to sign up
                            </h1>

                            <p
                                className="
                  mt-2
                  mb-6
                  text-[15px]
                  text-[#c4c4c4]
                  sm:text-[17px]
                  md:text-[18px]
                "
                            >
                                Or get started with a new account.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSignup}>
                            {/* Email */}
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email or mobile number"
                                className="
                  h-[52px]
                  w-full
                  rounded-lg
                  border
                  border-[#737373]
                  bg-[#211717]/80
                  px-4
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-[#b3b3b3]
                  transition
                  focus:border-white
                  focus:ring-2
                  focus:ring-white/30
                  sm:h-[56px]
                  sm:text-[16px]
                "
                            />

                            {/* Password */}
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="
                  mt-4
                  h-[52px]
                  w-full
                  rounded-lg
                  border
                  border-[#737373]
                  bg-[#211717]/80
                  px-4
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-[#b3b3b3]
                  transition
                  focus:border-white
                  focus:ring-2
                  focus:ring-white/30
                  sm:h-[56px]
                  sm:text-[16px]
                "
                            />

                            {/* Confirm Password */}
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="
                  mt-4
                  h-[52px]
                  w-full
                  rounded-lg
                  border
                  border-[#737373]
                  bg-[#211717]/80
                  px-4
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-[#b3b3b3]
                  transition
                  focus:border-white
                  focus:ring-2
                  focus:ring-white/30
                  sm:h-[56px]
                  sm:text-[16px]
                "
                            />

                            {/* Sign Up Button */}
                            <button
                                type="submit"
                                className="
                  mt-5
                  h-[48px]
                  w-full
                  rounded-lg
                  bg-[#e50914]
                  text-[16px]
                  font-bold
                  text-white
                  transition
                  duration-200
                  hover:bg-[#c11119]
                  active:scale-[0.99]
                  sm:mt-6
                  sm:text-[18px]
                "
                            >
                                Sign Up
                            </button>

                            {/* Error / Success */}
                            {error ? (
                                <div
                                    className="
                    mt-4
                    flex
                    w-full
                    items-start
                    gap-3
                    rounded-md
                    border
                    border-red-500/30
                    bg-red-500/10
                    px-3
                    py-3
                    text-sm
                    text-red-400
                    sm:px-4
                  "
                                >
                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                        !
                                    </div>

                                    <p className="break-words">{error}</p>
                                </div>
                            ) : success ? (
                                <div
                                    className="
                    mt-4
                    flex
                    w-full
                    items-start
                    gap-3
                    rounded-md
                    border
                    border-green-500/30
                    bg-green-500/10
                    px-3
                    py-3
                    text-sm
                    text-green-400
                    sm:px-4
                  "
                                >
                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                                        ✓
                                    </div>

                                    <p className="break-words">{success}</p>
                                </div>
                            ) : null}
                        </form>

                        {/* Sign In */}
                        <p
                            className="
                mt-8
                text-[14px]
                text-gray-400
                sm:mt-10
                sm:text-[16px]
              "
                        >
                            New to Netflix?{" "}
                            <Link
                                to="/signin"
                                className="text-white hover:underline"
                            >
                                Sign In Now.
                            </Link>
                        </p>

                        {/* Help */}
                        <button
                            type="button"
                            className="
                mt-8
                flex
                items-center
                gap-1
                text-[14px]
                text-white
                sm:mt-10
                sm:text-[16px]
              "
                        >
                            Get Help
                            <ChevronDown size={20} strokeWidth={2} />
                        </button>

                        {/* reCAPTCHA */}
                        <p
                            className="
                mt-6
                pb-16
                text-[12px]
                leading-5
                text-[#a3a3a3]
                sm:mt-8
                sm:pb-20
                sm:text-[13px]
              "
                        >
                            This page is protected by Google reCAPTCHA to ensure you're not
                            a bot.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;