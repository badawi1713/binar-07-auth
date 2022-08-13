import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const todos = [
    "Membuat proses autentikasi",
    "Membuat halaman login, register, dashboard, dan detail",
    "Melakukan proses CRUD",
  ];

  return (
    <main
      style={{
        backgroundImage: `url("${window.location.origin}/assets/images/auth-cover.jpg")`,
      }}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-teal-50 bg-cover bg-center bg-no-repeat py-6 sm:py-12"
    >
      <div className="absolute inset-0 bg-center "></div>
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <h1 className="font-bold text-2xl leading-9">Materi 6 - Binar</h1>
        <section className="mx-auto max-w-md">
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
              <p>
                Belajar membuat{" "}
                <code className="text-sm font-bold text-teal-500">auth</code>{" "}
                dengan React menggunakan{" "}
                <code className="text-sm font-bold text-teal-500">
                  react-router-dom
                </code>{" "}
                versi 6.
              </p>
              <ul className="space-y-4">
                {todos?.map((item, index) => {
                  return (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-6 w-6 flex-none fill-teal-100 stroke-teal-500 stroke-2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="11" />
                        <path
                          d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                          fill="none"
                        />
                      </svg>
                      <p className="ml-4">{item}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="pt-8 text-base font-semibold leading-7">
              <p className="text-gray-900">Getting Started</p>
              <p>
                <Link to="/dashboard" className="text-teal-500 hover:text-teal-600">
                  Let's go! &rarr;
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
