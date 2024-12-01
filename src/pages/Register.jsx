import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingComponent";
import { useRegisterMutation } from "../redux/Slice/slice";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { selectAuth, setUser } from "../redux/Slice/authSlice";

export const Register = () => {
  const [registerData, setregisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user, access_token, userRole } = useAppSelector(selectAuth).value;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register] = useRegisterMutation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const registerResponse = await register(registerData).unwrap();
      if (registerResponse) {
        toast.success(registerResponse.message);
        dispatch(
          setUser({
            access_token: registerResponse.token,
          })
        );
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role && access_token) {
    return <Navigate to={`/${user.role}-dashboard`} />;
  }

  if (access_token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Box className=" w-full flex flex-col gap-3 justify-center pt-24 items-center">
      {loading && <LoadingSpinner loading={loading} />}
      <div className="flex flex-col gap-4 p-6 w-11/12 sm:w-1/3 md:w-1/4 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">
          Sign Up
        </h2>
        <TextField
          label="Name"
          type="text"
          value={registerData.name}
          onChange={(e) =>
            setregisterData({ ...registerData, name: e.target.value })
          }
          name="name"
          variant="outlined"
          required
        />
        <TextField
          label="Email"
          type="email"
          value={registerData.email}
          onChange={(e) =>
            setregisterData({ ...registerData, email: e.target.value })
          }
          name="email"
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={registerData.password}
          onChange={(e) =>
            setregisterData({ ...registerData, password: e.target.value })
          }
          variant="outlined"
          required
        />
        <Button
          style={{ background: "var(--button-bg)" }}
          variant="contained"
          onClick={handleSubmit}
          className="w-full  hover:bg-blue-600">
          Sign Up
        </Button>
      </div>
      <div>
        Already have account ?{" "}
        <Link to={"/login"} className="text-blue-600">
          Sign in
        </Link>
      </div>
    </Box>
  );
};
