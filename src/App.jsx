import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Layout } from "./Layout";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { ClientDashboard } from "./pages/ClientDashBoard";
import { RoleBasedRoute } from "./utils/RoleBasedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole={["admin"]}>
                    <AdminDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }></Route>

            <Route
              path="/client-dashboard"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole={["client"]}>
                    <ClientDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              }></Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
