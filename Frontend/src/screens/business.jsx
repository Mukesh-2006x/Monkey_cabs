import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import useStore from "../store";

const USERS_API = "http://localhost:5000/users";
const CARS_API = "http://localhost:5000/cars";
const IMGBB_API_KEY = "de6e5a194f2386d4f42707eaf1d2859e";

const Business = () => {
  const { user } = useStore();
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [carData, setCarData] = useState({ car: "", image: "", prize: "", contact: "", email: "", password: "" });
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchUserCars();
  }, [user]);

  const fetchUserCars = async () => {
    try {
      const response = await axios.get(CARS_API);
      const userCars = response.data.filter((car) => car.ownerEmail === user.email);
      setCars(userCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleAddOrUpdateCar = async () => {
    if (!carData.car || !carData.image || !carData.prize || !carData.contact || !carData.email || !carData.password) {
      alert("All fields are required!");
      return;
    }

    try {
      const userResponse = await axios.get(USERS_API);
      const matchedUser = userResponse.data.find((u) => u.gmail === carData.email && u.password === carData.password);

      if (!matchedUser) {
        alert("Invalid email or password!");
        return;
      }

      if (editingCar) {
        await axios.put(`${CARS_API}/${editingCar.id}`, { ...editingCar, ...carData });
        setCars(cars.map((car) => (car.id === editingCar.id ? { ...editingCar, ...carData } : car)));
      } else {
        const newCar = { ...carData, owner: matchedUser.username, ownerEmail: matchedUser.gmail };
        const response = await axios.post(CARS_API, newCar);
        setCars([...cars, { ...newCar, id: response.data.id }]);
      }

      setOpen(false);
      setEditingCar(null);
      setCarData({ car: "", image: "", prize: "", contact: "", email: "", password: "" });
    } catch (error) {
      console.error("Error processing car:", error);
    }
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setCarData({ ...car, email: "", password: "" });
    setOpen(true);
  };

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`${CARS_API}/${id}`);
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCarData((prev) => ({ ...prev, image: response.data.data.url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });

  return (
    <Container sx={{marginTop:{xs:'30%',sm:'20%',md:'10%'}}}>
      <Paper elevation={3} sx={{ p: 3, mt: 8, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>Your Added Cars</Typography>

        {cars.length > 0 ? (
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {cars.map((car) => (
              <Card key={car.id} sx={{ width: 300, p: 2, borderRadius: 3 }}>
                <CardMedia component="img" sx={{ height: 180, borderRadius: 2 }} image={car.image} alt={car.car} />
                <CardContent>
                  <Typography variant="h6">{car.car}</Typography>
                  <Typography variant="body2">Owner: {car.owner}</Typography>
                  <Typography variant="body2">Prize: ${car.prize}</Typography>
                  <Typography variant="body2">Contact: {car.contact}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <IconButton color="primary" onClick={() => handleEditCar(car)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCar(car.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography>No cars added yet.</Typography>
        )}
      </Paper>

      {user && (
        <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
          <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
            <AddIcon />
          </Fab>
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth >
        <DialogTitle>{editingCar ? "Edit Car" : "Add a New Car"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
          <TextField label="Car Name" fullWidth required value={carData.car} onChange={(e) => setCarData({ ...carData, car: e.target.value })} />
          
          <Box
            {...getRootProps()}
            sx={{
              mt: 2,
              p: 3,
              border: "2px dashed #ccc",
              borderRadius: 2,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: isDragActive ? "#f0f0f0" : "transparent",
            }}
          >
            <input {...getInputProps()} />
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography>{isDragActive ? "Drop the image here" : "Drag & Drop an image or click to upload"}</Typography>
            )}
          </Box>

          {carData.image && (
            <CardMedia component="img" sx={{ height: 180, borderRadius: 2, mt: 2 }} image={carData.image} alt="Uploaded Image" />
          )}

          <TextField label="Prize" fullWidth required value={carData.prize} onChange={(e) => setCarData({ ...carData, prize: e.target.value })} />
          <TextField label="Contact" fullWidth required value={carData.contact} onChange={(e) => setCarData({ ...carData, contact: e.target.value })} />
          <TextField label="Email (Verify)" fullWidth required value={carData.email} onChange={(e) => setCarData({ ...carData, email: e.target.value })} />
          <TextField label="Password (Verify)" type="password" fullWidth required value={carData.password} onChange={(e) => setCarData({ ...carData, password: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddOrUpdateCar} color="primary" variant="contained">
            {editingCar ? "Update Car" : "Add Car"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Business;
