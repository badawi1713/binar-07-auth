import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-400 flex items-center justify-center">
        <Link to="/register" className="p-6 bg-white shadow-sm rounded-md mx-auto hover:bg-gray-300">REGISTER</Link>
    </main>
  );
};

export default Home;
