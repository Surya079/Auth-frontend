import React from "react";
import { useAppSelector } from "../../redux/customHook";
import { selectTheme } from "../../redux/Slice/themeSlice";

const ThemeProvider = ({ children }) => {
  const theme = useAppSelector(selectTheme);

  React.useEffect(() => {
    const root = document.documentElement;

    Object.keys(theme).forEach((key) => {
      root.style.setProperty(key, theme[key]);
    });
  }, [theme]);

  return <div>{children}</div>;
};

export default ThemeProvider;
