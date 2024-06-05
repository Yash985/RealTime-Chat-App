import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import "./App.css";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <AuthContextProvider>
        <SocketContextProvider>
        <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </SocketContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
