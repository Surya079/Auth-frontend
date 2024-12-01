import { Box, Button, TextField } from "@mui/material";
import React, {  useState } from "react";
import LoadingSpinner from "../components/LoadingComponent";
import { useLoginMutation } from "../redux/Slice/slice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { selectAuth, setUser } from "../redux/Slice/authSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectAuth).value.user;
  const [login, { isSuccess }] = useLoginMutation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const loginResponse = await login(loginData).unwrap();
      if (loginResponse) {
        toast.success(loginResponse.message);
        dispatch(
          setUser({
            token: loginResponse.token,
            user: loginResponse.user,
          })
        );
        if (loginResponse.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (loginResponse.user.role === "client") {
          navigate("/client-dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };
  if (user) {
    const protectedUrl = `/${user.role}-dashboard`;
    return <Navigate to={protectedUrl} />;
  }
  return (
    <Box className=" w-full flex flex-col gap-3 justify-center pt-32 items-center">
      {loading && <LoadingSpinner loading={loading} />}
      <div className="flex flex-col gap-4 p-6 w-11/12 sm:w-1/3 md:w-1/4 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-700">
          Sign In
        </h2>
        <TextField
          label="Email"
          type="email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          name="email"
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          variant="outlined"
          required
        />
        <Button
          style={{ background: "var(--button-bg)" }}
          variant="contained"
          onClick={handleSubmit}
          className="w-full  hover:bg-blue-600">
          Sign in
        </Button>
      </div>
      <div>
        No account ?{" "}
        <Link to={"/register"} className="text-blue-600">
          Sign Up
        </Link>
      </div>
    </Box>
  );
};
