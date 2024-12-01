import { Box } from "@mui/material";
import React from "react";

export const Footers = () => {
  return (
    <Box className="fixed bottom-0 w-full z-10" style={{ background: "var(--secondary-color)" }}>
      <Box className="flex justify-center p-2">
        <div className="text-black">
          © 2024 All Rights Reserved{" "}
          <span className="text-[10px] text-blue-600">Developed by Surya</span>
        </div>
      </Box>
    </Box>
  );
};
