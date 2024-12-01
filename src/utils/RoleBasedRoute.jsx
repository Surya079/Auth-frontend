import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingComponent";
import { Navigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../constant/apiUrl";
import { useAppSelector } from "../redux/customHook";
import { selectAuth } from "../redux/Slice/authSlice";

export const RoleBasedRoute = ({ children, requiredRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useAppSelector(selectAuth).value.access_token;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const verifyResponse = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}${API_URL.verify}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (verifyResponse) {
          setUser(verifyResponse.data.user);
        }
      } catch (err) {
        toast.error(err.response.data.message, {
          toastId: "unique-toast-id",
        });
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }
  if (!requiredRole.includes(user.role)) {
    return <Navigate to={"/unathurized"} />;
  }

  return user ? children : <Navigate to="/login" />;
};
