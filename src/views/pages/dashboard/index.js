import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-teal-600">
      <h2 className="text-2xl text-white mb-6">Dashboard</h2>
      <div className="flex gap-8">
        <button
          onClick={onLogout}
          className="p-2 bg-white rounded-md text-center w-auto"
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
