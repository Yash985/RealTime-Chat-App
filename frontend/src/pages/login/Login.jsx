import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useLogin from "../../hooks/useLogin";
const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

  const { authUser } = useAuthContext();
  const { loading, login } = useLogin();

  const handlesubmit = async(e) => {
    e.preventDefault();
    await login( username, password )
   }

  if (authUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> Wren</span>
        </h1>

        <form onSubmit={handlesubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 inline-block p-2"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2"
            disabled={loading}>
              {loading?<span className="loading loading-spinner"></span>:"Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
