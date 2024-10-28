import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Navbar from "./components/NavBar";
import { Box } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <AuthProvider>
            <ProjectProvider>
              <RoutesMiddleware />
            </ProjectProvider>
          </AuthProvider>
        </ConfirmProvider>
        <ToastContainer />
      </ThemeProvider>
    </Router>
  );
};

// const WithNavbar: React.FC<any> = ({ children }) => {
//   return (<>
//     <Navbar />
//     {children}
//   </>)
// }

const RoutesMiddleware = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Box sx={{ height: "100svh", overflow: "hidden" }}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Box>
  );
};

export default App;
