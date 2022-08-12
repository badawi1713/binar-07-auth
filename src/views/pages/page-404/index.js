import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <main
      style={{
        backgroundImage: `url("${window.location.origin}/assets/images/auth-cover.jpg")`,
      }}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-teal-50 bg-cover bg-center bg-no-repeat py-6 sm:py-12"
    >
      <div className="absolute inset-0 bg-center "></div>
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <h1 className="font-bold text-2xl leading-9">404;</h1>
        <section className="mx-auto max-w-md">
          <div className="divide-y divide-gray-300/50">
            <div className="pt-8 text-base font-semibold leading-7">
              <p className="text-gray-900">Halaman Tidak Ditemukan!</p>
              <p>
                <Link to="/" className="text-teal-500 hover:text-teal-600">
                  Kembali &rarr;
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page404;
