import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingComponent";
import { Navigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../constant/apiUrl";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { clearUser, selectAuth } from "../redux/Slice/authSlice";

export const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
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
        setError(true);
        toast.error(err.response.data.message, {
          toastId: "unique-toast-id",
        });
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(clearUser());
      <Navigate to={"/login"} />;
    }
  }, [error]);

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  return user ? children : <Navigate to="/login" />;
};
