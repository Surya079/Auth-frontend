import { Box } from "@mui/material";
import React from "react";
import Confetti from "react-confetti";
import { useAppSelector } from "../redux/customHook";
import { selectAuth } from "../redux/Slice/authSlice";
import { Navigate } from "react-router-dom";

export const ClientDashboard = () => {
  const [showConfetti, setShowConfetti] = React.useState(true);
  const user = useAppSelector(selectAuth).value.user;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="pt-5">
      {showConfetti && <Confetti />}
      <Box component={"div"} className=" flex  pt-6 justify-center">
        <div
          className="p-5 md:text-6xl text-5xl text-center font-boldanimate-pulse"
          style={{
            animation: "zoomIn 1.5s ease-in-out forwards",
          }}>
          Welcome to you {user.name}!
        </div>
        <div></div>
      </Box>
    </div>
  );
};
