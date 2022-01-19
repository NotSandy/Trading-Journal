import React, { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  AtSymbolIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen min-h-screen overflow-hidden overflow-y-scroll bg-neutral-1000 scrollbar-hide">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 shadow-lg rounded-xl bg-neutral-900">
          <div className="flex flex-col items-center">
            <div className="flex justify-center w-full mb-4 text-center">
              <h1 className="text-4xl tracking-wider text-neutral-100">
                Create an Account
              </h1>
            </div>
            <div className="flex justify-center w-full mb-8 text-center">
              <p className="pr-2 text-md text-neutral-100">
                Already have an account?
              </p>
              <Link href="/auth/login">
                <a className="underline text-md text-primary-500 underline-offset-4">
                  Login
                </a>
              </Link>
            </div>
            <form className="flex flex-col items-center w-full">
              <div className="relative w-full mb-8">
                <UserIcon className="absolute top-0 w-8 h-8 text-primary-500" />
                <input
                  className="w-full h-12 pl-12 tracking-widest transition duration-500 bg-transparent border-0 border-b-2 outline-none placeholder-opacity-80 border-b-neutral-800 placeholder-neutral-100 text-primary-500 focus:border-b-primary-500 selection:text-secondary-500"
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
                />
              </div>
              <div className="relative w-full mb-8">
                <AtSymbolIcon className="absolute top-0 w-8 h-8 text-primary-500" />
                <input
                  className="w-full h-12 pl-12 tracking-widest transition duration-500 bg-transparent border-0 border-b-2 outline-none placeholder-opacity-80 border-b-neutral-800 placeholder-neutral-100 text-primary-500 focus:border-b-primary-500 selection:text-secondary-500"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </div>
              <div className="relative w-full">
                <LockClosedIcon className="absolute top-0 w-8 h-8 text-primary-500" />
                <EyeIcon
                  className={`${
                    showPassword ? "opacity-1" : "opacity-50"
                  } absolute top-0 right-0 w-8 h-8 text-primary-500 transition duration-200 cursor-pointer`}
                  onClick={showPasswordHandler}
                />
                <input
                  className="w-full h-12 pl-12 tracking-widest transition duration-500 bg-transparent border-0 border-b-2 outline-none placeholder-opacity-80 border-b-neutral-800 placeholder-neutral-100 text-primary-500 focus:border-b-primary-500 selection:text-secondary-500"
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                  name="password"
                  required
                />
              </div>
              <div className="flex mt-4">
                <a className="pl-1 text-primary-100 text-md" href="#">
                  terms and conditions
                </a>
              </div>
              <div className="flex justify-center w-full mt-4">
                <button
                  className="w-full px-4 py-2 rounded-md bg-primary-500 text-neutral-100"
                  type="submit"
                >
                  Get Started!
                </button>
              </div>
            </form>
            <div className="flex justify-center my-8">
              <p className="text-sm text-neutral-500">OR</p>
            </div>
            <div className="flex justify-center mt-24">
              <p className="text-sm text-neutral-500">
                © 2022 Sandy Liu. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
