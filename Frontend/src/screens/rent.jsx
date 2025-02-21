import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
} from "@mui/material";
import "../app.css";

export default function Rent() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleRentClick = (contact) => {
    if (contact) {
      window.location.href = `tel:${contact}`;
    } else {
      alert("Contact number not available.");
    }
  };

  return (
    <Box className="p-6 bg-[#f5e6d1] min-h-screen">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ marginTop: { xs: "30%", sm: "10%", md: "6%" } }}
      >
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              className="shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedItem(item)}
              sx={{
                maxWidth: 320,
                margin: "auto",
                backgroundColor: "#F5E6D1",
                color: "black",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={item.image}
                alt={item.car}
                onError={(e) => (e.target.src = "https://via.placeholder.com/180")}
                className="object-cover"
              />
              <CardContent className="text-center">
                <Typography variant="h6" className="font-bold">
                  {item.car}
                </Typography>
                <Typography sx={{ color: "black" }}>${item.prize}</Typography>
                <Typography variant="body2">Owner: {item.owner}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Popup Dialog */}
      <Dialog
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        maxWidth="sm"
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#8B5E3B",
            color: "#F5E6D1",
            borderRadius: "12px",
          },
        }}
      >
        {selectedItem && (
          <>
            <DialogTitle align="center" className="font-bold text-lg">
              {selectedItem.car}
            </DialogTitle>
            <DialogContent className="flex flex-col items-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.car}
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "3px solid #f0d9b5",
                }}
                onError={(e) => (e.target.src = "https://via.placeholder.com/250")}
              />
              <Typography sx={{ mt: 2, fontSize: "18px", color: "#f0d9b5" }}>
                Price: ${selectedItem.prize}
              </Typography>
              <Typography sx={{ fontSize: "16px" }}>Owner: {selectedItem.owner}</Typography>
              <Typography sx={{ fontSize: "15px", color: "#e6c39b" }}>
                Contact: {selectedItem.contact}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#F5E6D1",
                  color: "black",
                  "&:hover": { backgroundColor: "#3E1E0F" },
                }}
                onClick={() => handleRentClick(selectedItem.contact)}
              >
                RENT
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
