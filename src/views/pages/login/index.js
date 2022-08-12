import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../components";

const Login = () => {
  const navigate = useNavigate();
  //   const { loggedIn } = useAuthStatus();

  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { email, password } = LoginForm;

  const emailRef = useRef(null);

  const handleInputChange = (e) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setResponse("");
    setIsError(false);
    setLoading(true);
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post("https://reqres.in/api/login", data);
      if (response?.data) {
        const token = response?.data?.token;
        setLoginForm({
          email: "",
          password: "",
        });
        emailRef.current.focus();
        localStorage?.setItem("token", token);
        const getToken = localStorage.getItem("token");
        setResponse(`Success, your token is ${getToken}`);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setResponse(error?.response?.data?.error);
      setLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  //   if (loggedIn) {
  //     return <Navigate to="/" />;
  //   }

  return (
    <main className="min-h-screen flex">
      <section className="w-4/6 hidden md:block">
        <div
          style={{
            backgroundImage:
              'url("http://localhost:3000/assets/images/auth-cover.jpg")',
          }}
          className="bg-cover h-full bg-center w-full bg-no-repeat"
        />
      </section>
      <section className="bg-white md:flex-1 max-w-lg w-full md:max-w-full mx-auto p-16 flex flex-col justify-center gap-8">
        <div className=" w-28 h-8 bg-yellow-400 rounded-sm"></div>
        <div>
          <h1 className="font-bold text-2xl leading-9 ">Welcome</h1>
          <p className="text-base">
            Belum memiliki akun?{" "}
            <Link to="/register" className="text-teal-600 hover:text-teal-700">
              Login
            </Link>
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-8">
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
            {loading ? <Loading /> : "Sign In"}
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

export default Login;
