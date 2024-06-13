import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { store } from "./app/store";
import AuthProvider from "./components/authProvider";
import Login from "./features/auth/login";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import ManageUsers from "./pages/manageUsers";
import theme from "./theme/theme";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="manage-users" element={<ManageUsers />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
