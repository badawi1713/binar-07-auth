import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ severity: "success", message: "Hello" });
  const [selectedData, setSelectedData] = useState(null);

  const { severity, message } = alert;

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getData = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users");
      if (response?.data) {
        setData(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setSelectedData(null);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleDelete = async () => {
    const { id } = selectedData;
    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`);
      if (response?.status === 204) {
        setShowAlert(true);
        const newData = data?.filter((item) => item.id !== id);
        setData(newData);
        setAlert({ message: "User is deleted!", severity: "success" });
        handleClose();
        setSelectedData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-teal-600 py-8 relative">
      {showAlert && (
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
      )}
      {showConfirmation && (
        <Dialog
          open={showConfirmation}
          onClose={handleClose}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">
            {"Confirm to delete user?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Confirm to delete user with ID {selectedData?.id}{" "}
              {selectedData?.last_name}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="flex justify-end gap-6">
              <button
                onClick={() => {
                  setSelectedData({});
                  handleClose();
                }}
                className="text-black rounded-md p-2  hover:text-gray-400 flex items-center w-full justify-center"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white rounded-md p-2 hover:bg-red-700 flex items-center w-full justify-center"
              >
                Confirm
              </button>
            </div>
          </DialogActions>
        </Dialog>
      )}
      <h2 className="text-2xl text-white mb-6">Dashboard</h2>
      <div className="flex gap-8 mb-10">
        <button
          onClick={onLogout}
          className="p-2 bg-white rounded-md text-center w-auto"
        >
          Logout
        </button>
      </div>
      <section className="flex flex-wrap gap-6 container mx-auto items-stretch justify-center">
        {data?.map((item) => {
          return (
            <div
              key={item?.id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
            >
              <img
                className="w-full h-60"
                src={item?.avatar}
                alt={item?.first_name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  #ID ${item?.id} - {item?.first_name} {item?.last_name}
                </div>
                <p className="italic">{item?.email || "-"}</p>
              </div>
              <div className="px-6 pt-4 pb-2 flex gap-4">
                <Link
                  to={`/detail/${item?.id}`}
                  className="border-teal-500 border text-teal-500 rounded-md p-1 hover:bg-teal-700 hover:text-white flex items-center w-full justify-center"
                >
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => {
                    setSelectedData(item);
                    handleDeleteConfirmation();
                  }}
                  className="bg-teal-500 text-white rounded-md p-1 hover:bg-teal-700 flex items-center w-full justify-center"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Dashboard;
