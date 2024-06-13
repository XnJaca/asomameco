import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectAuth } from "../features/auth/authSlice";

const Home = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Home
        </Typography>
        {auth.isAuthenticated ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Welcome, {auth.user}!</Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="h6" sx={{ mt: 4 }}>
            Please log in.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Home;
