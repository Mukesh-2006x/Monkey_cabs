import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Box, CircularProgress, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import useStore from "../store";
import Authbg from "../assets/authbg.png"; // Background image for styling

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(""); // Stores the uploaded image URL
  const [uploading, setUploading] = useState(false); // State for image upload
  const navigate = useNavigate();
  const { login } = useStore();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=de6e5a194f2386d4f42707eaf1d2859e`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProfile(response.data.data.url);
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!profile) return alert("Please upload a profile picture!");

    try {
      const newUser = { gmail: email, password, username, profile };
      await axios.post("http://localhost:5000/users", newUser);
      login(newUser);
      navigate("/");
    } catch (error) {
      console.error("Sign Up error:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${Authbg})`,
        marginTop:{xs:'20%',s:'15%',sm:'10%',md:'2%'},
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
          width: 380,
          borderRadius: 3,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "brown" }}>
          Create an Account
        </Typography>
        <Box component="form" onSubmit={handleSignUp} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                "& fieldset": { border: "none" },
              },
            }}
          />
          <TextField
            label="Password"
            
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                "& fieldset": { border: "none" },
              },
            }}
          />
          <TextField
            label="Username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                "& fieldset": { border: "none" },
              },
            }}
          />

          {/* Profile Picture Upload */}
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed rgba(255, 255, 255, 0.5)",
              padding: 3,
              textAlign: "center",
              cursor: "pointer",
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <CircularProgress />
            ) : profile ? (
              <img src={profile} alt="Profile Preview" width={100} height={100} style={{ borderRadius: "50%" }} />
            ) : (
              <Typography sx={{ color: "brown" }}>Drag & drop a profile picture, or click to select</Typography>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "brown",
              color: "rgb(225, 193, 110)",
              borderRadius: 2,
              "&:hover": { bgcolor: "brown" },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
