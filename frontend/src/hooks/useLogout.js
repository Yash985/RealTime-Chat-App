import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async  () => {
        setLoading(true);
        try {
             await axios.post("/api/auth/logout", {
                headers: { "Content-Type": "application/json" },
            });
            localStorage.removeItem("authUserInfo");
            setAuthUser(null);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, logout };
}

export default useLogout