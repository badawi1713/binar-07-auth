import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../../components";

const Detail = () => {
  const { id: userID } = useParams();
  const [dataForm, setDataForm] = useState({
    id: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ severity: "success", message: "Hello" });
  const { severity, message } = alert;

  const { id, first_name, last_name } = dataForm;

  const handleInputChange = (e) => {
    setDataForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const getDetailData = useCallback(async () => {
    setSpinner(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userID}`);
      if (response?.data?.data) {
        const { id, last_name, first_name } = response?.data?.data;
        setDataForm({ id: id, first_name, last_name });
      }
      setSpinner(false);
    } catch (error) {
      setShowAlert(true);
      setAlert({ message: error?.response?.data?.error, severity: "error" });
      setSpinner(false);
    }
  }, [userID]);

  useEffect(() => {
    getDetailData();
  }, [getDetailData]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const data = {
      first_name,
      last_name,
    };
    try {
      await axios.put(`https://reqres.in/api/users/${userID}`, data);
      setShowAlert(true);
      setAlert({ message: "User is updated!", severity: "success" });
      setSpinner(false);
      getDetailData();
    } catch (error) {
      setShowAlert(true);
      setAlert({ message: error?.response?.data?.error, severity: "error" });
      setSpinner(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center ">
      <div className="flex p-6 gap-8 justify-between items-center w-full bg-teal-600">
        <Link
          to="/dashboard"
          className="text-white hover:text-gray-400 text-lg"
        >
          &larr; Kembali
        </Link>
        <h2 className="text-lg text-white">User ID: {id}</h2>
      </div>
      <form
        onSubmit={handleUpdate}
        className="bg-white w-full md:max-w-3xl  mx-auto px-16 py-8 flex flex-col justify-center gap-8"
      >
        <h2 className="text-2xl font-bold">Edit Form</h2>
        <div className="flex flex-col gap-2">
          <label>First Name</label>
          <input
            onChange={handleInputChange}
            className=" px-4 py-2 border rounded-md text-sm  "
            type={"text"}
            name="first_name"
            id="first_name"
            placeholder="First name..."
            value={first_name}
            disabled={loading}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Last Name</label>
          <input
            onChange={handleInputChange}
            className=" px-4 py-2 border rounded-md text-sm  "
            type={"text"}
            name="last_name"
            id="last_name"
            placeholder="Last name..."
            value={last_name}
            disabled={loading}
            required
          />
        </div>
        <div className="flex w-full gap-4">
          <button
            disabled={loading}
            className="text-teal-500 rounded-md p-2 border-teal-500 hover:bg-teal-700 hover:text-white border flex items-center disabled:hover:border-gray-100 disabled:border-gray-100 w-28 justify-center"
            onClick={getDetailData}
            type="button"
          >
            Reset
          </button>
          <button
            disabled={loading}
            className="bg-teal-500 text-white rounded-md p-2 hover:bg-teal-700 flex items-center disabled:hover:bg-gray-100 disabled:bg-gray-100 w-28 justify-center"
            type="submit"
          >
            {loading ? <Spinner /> : "Save"}
          </button>
        </div>
      </form>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Detail;
