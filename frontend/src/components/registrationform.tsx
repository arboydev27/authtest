"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegistrationForm = () => {
  const router = useRouter();
  const [seed, setSeed] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<String | null>(null);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     await post("/register", { fullName, email, password });
  //     router.push("/home");
  //   } catch (error) {
  //     setError("Invalid credentials");
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      /* ---------- inline “post” helper ---------- */
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        credentials: "include", // ⬅️ send/receive session cookie
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || res.statusText);
      }
      /* ----------------------------------------- */

      router.push("/home");
    } catch (err) {
      setError((err as Error).message ?? "Something went wrong");
      console.error(err);
    }
  };

  // Generate a random seed for the avatar image because the API does not support dynamic updates
  useEffect(() => {
    const newSeed = Math.random().toString(36).substring(7);
    setSeed(newSeed);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F0F4F8] backdrop-blur-xs">
      <div className="relative w-full max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg animation-[var(--animation-slide-up-fade)]">
        <>
          {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign Up for an account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                onSubmit={handleSubmit}
                // action="#"
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      autoComplete="name"
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default RegistrationForm;
