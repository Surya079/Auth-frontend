import { Box } from "@mui/material";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { useAppSelector } from "../redux/customHook";
import { selectAuth } from "../redux/Slice/authSlice";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export const ClientDashboard = () => {
  const [showConfetti, setShowConfetti] = React.useState(true);
  const [advice, setAdvice] = useState("");
  const user = useAppSelector(selectAuth).value.user;

  React.useEffect(() => {
    const getAdvice = async () => {
      try {
        const adviceResponse = await axios.get(
          "https://api.adviceslip.com/advice"
        );
        if (adviceResponse) {
          setAdvice(adviceResponse.data.slip.advice);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAdvice();
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
      <Box
        component={"div"}
        className=" flex flex-col items-center  pt-6 justify-center">
        <div
          className="p-5 md:text-6xl text-5xl text-center font-boldanimate-pulse"
          style={{
            animation: "zoomIn 1.5s ease-in-out forwards",
          }}>
          Welcome to you {user.name}!
        </div>
        <div className="text-black font-bold ">Day of the advice</div>
        <div>
          <div
            className="p-5 md:text-2xl text-5xl text-center font-boldanimate-pulse"
            style={{
              animation: "zoomIn 1.5s ease-in-out forwards",
            }}>
            {advice}
          </div>
        </div>
        <div className="text-gray-600 text-[10px]">
          <span className="text-black font-bold">Note :{" "}</span>If you like my application or any query about this
          application let's text on :{" "}
          <Link
            className="text-blue-400"
            to={"https://www.linkedin.com/in/surya-v-sv0009/"}>
            Linkedin
          </Link>
        </div>
      </Box>
    </div>
  );
};
