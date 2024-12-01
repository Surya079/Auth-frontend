import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import Logo from "/image/surya (2).jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { clearUser, selectAuth } from "../redux/Slice/authSlice";

export const Navbar = () => {
  const user = useAppSelector(selectAuth).value.user;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      style={{ background: "var(--secondary-color)" }}
      className="z-10">
      <Toolbar className="flex flex-row justify-between">
        <img src={Logo} alt="Logo" width={40} className="mix-blend-multiply" />
        <div className="text-black font-bold text-[12px] md:text-lg">
          Authentication System
        </div>
        <Button
          variant="text"
          style={{
            background: "var(--button-bg)",
            padding: "2px 0 2px 0",
            textTransform: "none",
          }}>
          {user ? (
            <span
              onClick={() => {
                dispatch(clearUser());
                navigate("/login");
              }}
              className="text-black text-md">
              Logout
            </span>
          ) : (
            <Link to="/login" className="text-black text-md">
              Sign in
            </Link>
          )}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
