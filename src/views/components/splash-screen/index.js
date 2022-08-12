import React from "react";
import Spinner from "../spinner";

const SplashScreen = () => {
  return (
    <div className="min-h-screen bg-teal-600 flex flex-col justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
};

export default SplashScreen;
