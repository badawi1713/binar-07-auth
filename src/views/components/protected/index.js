import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../../../hooks/useAuthStatus";

const Protected = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  useEffect(() => {
    if (!checkingStatus) {
      if (!loggedIn) {
        alert("Harus login terlebih dahulu!");
      }
    }
  }, [checkingStatus, loggedIn]);

  if (checkingStatus) {
    return <p>Loading</p>;
  }

  return loggedIn ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default Protected;
