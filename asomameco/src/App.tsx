import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./app/store";
import AuthProvider from "./components/authProvider";
import DashboardLayout from "./components/dashboardLayout";
import Login from "./features/auth/login";
import Dashboard from "./pages/dashboard";
import ManageUsers from "./pages/manageUsers";
import theme from "./theme/theme";
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <ToastContainer />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route
                path="manage-users"
                element={
                  <DashboardLayout>
                    <ManageUsers />
                  </DashboardLayout>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
