import React from "react";
import { Footers } from "./components/Footers";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import { Navbar } from "./components/Headers";
import ThemeProvider from "./components/ThemeProvider/index.jsx";
import { useAppSelector } from "./redux/customHook";
import { selectTheme } from "./redux/Slice/themeSlice";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Layout = ({ children }) => {
  const theme = useAppSelector(selectTheme);
  return (
    <div>
      <ThemeProvider>
        <Navbar />
        <ToastContainer />
        <PersistGate loading={null} persistor={persistor}>
          <main
            style={{
              background: theme["--primary-color"],
              minHeight: "100vh",
            }}>
            {children}
          </main>
        </PersistGate>
        <Footers />
      </ThemeProvider>
    </div>
  );
}

