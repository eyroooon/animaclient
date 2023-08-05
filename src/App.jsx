import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { AuthRoutes } from "./components/AuthRoutes";

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/*"
        element={
          <AuthRoutes>
            <Auth />
          </AuthRoutes>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard/home" replace />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
