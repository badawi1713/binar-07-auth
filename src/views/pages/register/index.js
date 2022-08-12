import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../../components";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setSpinner] = useState(false);
  const { email, password } = registerForm;

  const emailRef = useRef(null);

  const handleInputChange = (e) => {
    setRegisterForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setResponse("");
    setIsError(false);
    setSpinner(true);
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post("https://reqres.in/api/register", data);
      if (response?.data) {
        setRegisterForm({
          email: "",
          password: "",
        });
        emailRef.current.focus();
      }
      setSpinner(false);
      setResponse('Akun berhasil terdaftar, silakan login.');
    } catch (error) {
      setResponse(error?.response?.data?.error);
      setSpinner(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <main className="min-h-screen block md:flex">
      <section className="w-4/6 hidden md:block">
        <div
          style={{
            backgroundImage: `url("${window.location.origin}/assets/images/auth-cover.jpg")`,
          }}
          className="bg-cover h-full bg-center w-full bg-no-repeat"
        />
      </section>
      <section className="bg-white md:flex-1 max-w-lg w-full md:max-w-full mx-auto p-16 flex flex-col justify-center gap-8">
        <div className=" w-28 h-8 bg-yellow-400 rounded-sm"></div>
        <div>
          <h1 className="font-bold text-2xl leading-9 ">Register</h1>
          <p className="text-base">
            Sudah memiliki akun?{" "}
            <Link to="/login" className="text-teal-600 hover:text-teal-700">
              Login
            </Link>
          </p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              ref={emailRef}
              onChange={handleInputChange}
              className=" px-4 py-2 border rounded-md text-sm  "
              type={"email"}
              name="email"
              id="email"
              placeholder="Contoh: john.doe@gmail.com"
              value={email}
              disabled={loading}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              onChange={handleInputChange}
              className=" px-4 py-2 border rounded-md text-sm  "
              type={"password"}
              name="password"
              id="password"
              placeholder="6+ karakter"
              value={password}
              disabled={loading}
              required
            />
          </div>
          <button
            disabled={loading}
            className="bg-teal-500 text-white rounded-md p-2 hover:bg-teal-700 flex items-center disabled:hover:bg-gray-100 disabled:bg-gray-100 justify-center"
            type="submit"
          >
            {loading ? <Spinner /> : "Sign Up"}
          </button>
        </form>
        {response && (
          <p
            className={`font-semibold text-center ${
              isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {response}
          </p>
        )}
      </section>
    </main>
  );
};

export default Register;
