import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../../components";

const Detail = () => {
  const { id: userID } = useParams();
  const [dataForm, setDataForm] = useState({
    id: "",
    name: "",
  });
  const [isError, setIsError] = useState(false);
  const [loading, setSpinner] = useState(false);
  const [response, setResponse] = useState("");

  const { id, name } = dataForm;

  const handleInputChange = (e) => {
    setDataForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const getDetailData = useCallback(async () => {
    setIsError(false);
    setSpinner(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userID}`);
      if (response?.data?.data) {
        const { id, last_name, first_name } = response?.data?.data;
        setDataForm({ id: id, name: `${first_name} ${last_name}` });
      }
      setSpinner(false);
    } catch (error) {
      setResponse(error?.response?.data?.error);
      setSpinner(false);
      setIsError(true);
    }
  }, [userID]);

  useEffect(() => {
    getDetailData();
  }, [getDetailData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setResponse("");
    setIsError(false);
    setSpinner(true);
    const data = {
      name,
    };
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${userID}`,
        data
      );
      if (response?.data) {
        setDataForm({
          id: "",
          name: "",
        });
      }
      setSpinner(false);
      setResponse("User has been updated!");
      getDetailData();
    } catch (error) {
      setResponse(error?.response?.data?.error);
      setSpinner(false);
      setIsError(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-teal-600">
      <div className="flex p-16 lg:p-6 gap-8 container justify-between items-center w-full">
        <Link to="/dashboard" className="text-white hover:text-gray-400">
          &larr; Kembali
        </Link>
        <h2 className="text-2xl text-white">Detail {name}</h2>
      </div>
      <form
        onSubmit={handleUpdate}
        className="bg-white md:flex-1 max-w-lg w-full md:max-w-full mx-auto p-16 flex flex-col justify-center gap-8"
      >
        <div className="flex flex-col gap-2">
          <label>ID</label>
          <input
            onChange={handleInputChange}
            className=" px-4 py-2 border rounded-md text-sm  "
            type={"text"}
            name="id"
            id="id"
            placeholder="ID User"
            value={id}
            disabled
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Fullname</label>
          <input
            onChange={handleInputChange}
            className=" px-4 py-2 border rounded-md text-sm  "
            type={"text"}
            name="name"
            id="name"
            placeholder="Fullname"
            value={name}
            disabled={loading}
            required
          />
        </div>
        <button
          disabled={loading}
          className="bg-teal-500 text-white rounded-md p-2 hover:bg-teal-700 flex items-center disabled:hover:bg-gray-100 disabled:bg-gray-100 justify-center"
          type="submit"
        >
          {loading ? <Spinner /> : "Edit"}
        </button>
        {response && (
          <p
            className={`font-semibold text-center ${
              isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {response}
          </p>
        )}
      </form>
    </main>
  );
};

export default Detail;
