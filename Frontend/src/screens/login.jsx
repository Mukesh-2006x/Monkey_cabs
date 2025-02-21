import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Paper, TextField, Button, Typography, Box } from "@mui/material";
import useStore from "../store";
import Authbg from '../assets/authbg.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;
      const user = users.find((u) => u.gmail === email && u.password === password);

      if (user) {
        login({ email: user.gmail, username: user.username, profile: user.profile });
        navigate("/");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${Authbg})`,
        marginTop:{xs:'20%',s:'15%',sm:'10%',md:'1%'},
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 360,
          borderRadius: 3,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "brown" }}>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
              },
              input: { color: "brown" },
              label: { color: "brown" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
              },
              input: { color: "brown" },
              label: { color: "brown" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "brown",
              color: "rgb(225, 193, 110)",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": { bgcolor: "brown" },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
