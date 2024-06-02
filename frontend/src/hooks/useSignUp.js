import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/signup",

        {
          data: JSON.stringify({
            fullName,
            username,
            password,
            confirmPassword,
            gender,
          }),
        },

        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signUp };
};

export default useSignUp;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
}
