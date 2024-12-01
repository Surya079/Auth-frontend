import { Box } from "@mui/material";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { useAppSelector } from "../redux/customHook";
import { selectAuth } from "../redux/Slice/authSlice";
import { Navigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns } from "../components/AdminHelper";
import axios from "axios";
import API_URL from "../constant/apiUrl";

export const AdminDashboard = () => {
  const [showConfetti, setShowConfetti] = React.useState(true);
  const [userdata, setUserdata] = useState([]);
  const { user, access_token } = useAppSelector(selectAuth).value;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    const getUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}${API_URL.getUser}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (response.data) {
          let sno = 0;
          const data = response.data.users.map((val, index) => ({
            sno: sno++,
            name: val.name,
            email: val.email,
            password: val.password,
          }));
          setUserdata(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    return () => clearTimeout(timer);
  }, []);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="pt-6">
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
      <DataTable columns={columns} data={userdata} className="p-2" />
    </div>
  );
};
