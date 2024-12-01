import { useMediaQuery, useTheme } from "@mui/material";

const useMobileView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return isMobile;
};

export default useMobileView;
