"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";

const LoginID: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { setLoggedIn } = useAuth();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setIsValid(false);
      return;
    }

    // Proceed with login and store email
    setLoggedIn(true, email);
    router.push("/");
  };

  return (
    <section className="relative h-screen flex justify-center ">
      <div className="relative flex justify-center pt-10 lg:pt-9">
        <div className="container">
          <div className="w-full px-4 lg:m-5 lg:mb-10 lg:mt-12">
            <div className="w-full ">
              <h4 className="font-semibold bg-gradient-to-br text-white text-2xl md:font-bold lg:text-2xl">
                Log in using your account
              </h4>
            </div>
          </div>
          {/* --start-- */}
          <div className="m-6">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-Dark-blue focus:border-Dark-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isValid && !email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-Dark-blue focus:border-Dark-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isValid && !password && (
                  <p className="text-red-500 text-sm">Password is required</p>
                )}
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-Dark-blue dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-Dark-blue hover:bg-[#384390] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log In
              </button>
            </form>
          </div>
          {/* --end-- */}
          <div className="mx-auto flex justify-center ">
            <h5 className="font-normal bg-gradient-to-br mt-6 text-gray-300 text-sm lg:text-sm">
              Don&apos;t have an account ?{" "}
              <Link href={"/signUp"}>
                <span className="text-white font-bold hover:underline hover:text-blue-600">Register Here</span>
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginID;
