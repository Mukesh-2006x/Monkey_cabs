import { Box, Button, Typography, Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import * as React from 'react';
import Carbgmain from '../assets/carbgmain.jpg';
import Getrent from '../assets/getrent.jpg';
import Carrent2 from  '../assets/carrent2.jpeg'
import { Link, useLocation } from "react-router-dom";
import '../app.css'
const pages = [
    { name: "Home", path: "/" },
    { name: "Rent Car", path: "/rent" },
    { name: "Start Business", path: "/business" },
  ];

const Home = () => {
    return (
        <Box>
            {/* Hero Section */}
            <Box 
                sx={{
                    width: "100vw",
                    height: "100vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&::before": {
                        content: "''",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${Carbgmain})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        filter: "blur(1px)",
                        zIndex: -1
                    }
                }}
            >
                <Box sx={{ maxWidth: '90%', textAlign: "center", position: "relative", zIndex: 1,marginTop:{xs:'100%',sm:'20%',md:'0%'} }}>
                    <Typography 
                        variant="h2" 
                        sx={{
                            fontFamily: "'Poppins', sans-serif", 
                            color: "white",  
                            fontWeight: "bold",
                            textShadow: "2px 2px 10px rgba(5, 5, 5, 0.7)",
                            fontSize: { xs: "24px", sm: "36px", md: "48px" }
                        }}
                    >
                        THE BEST PLATFORM FOR CAR RENTAL
                    </Typography>
                    
                    <Typography 
                        sx={{
                            color: 'white',
                            fontWeight: "bold",
                            fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            marginBottom: "20px"
                        }}
                    >
                        We open the door for you to explore the world in comfort and style. Being your trusted travel partner.
                    </Typography>

                    {/* Car Rental Cards */}
                    <Box sx={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        flexWrap: "wrap", 
                        gap: 3 
                    }}>
                        <Card sx={{ maxWidth: 345, borderRadius: "15px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }} noWrap component={Link}
                                    to="/business" style={{textDecoration:'none'}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={Getrent}
                                    alt="Start Business"
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'Poppins', sans-serif", 
                        color: "rgb(254, 148, 0)",  
                        fontWeight: "bold",}}>
                                        START BUSINESS
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Turn your car into a money-making asset! List your vehicle, set your terms, and start earning effortlessly
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card sx={{ maxWidth: 345, borderRadius: "15px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}noWrap component={Link}
                                    to="/rent" style={{textDecoration:'none'}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={Carrent2}
                                    alt="Car Rental"
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'Poppins', sans-serif", 
                        color: "rgb(254, 148, 0)",  
                        fontWeight: "bold",}}>
                                        RENT A CAR
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Experience the best car rental services with top-notch vehicles tailored for your comfort and style.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Box>
            </Box>

            {/* About Us Section */}
            <Box 
                sx={{ 
                    maxWidth: "90%", 
                    textAlign: "center", 
                    margin: '30px auto',
                    padding: "30px", 
                    borderRadius: "25px",
                    marginTop:{xs:'50%',sm:"20%",md:"0%"}
                }}
            >
                <Typography 
                    variant="h2" 
                    sx={{
                        fontFamily: "'Poppins', sans-serif", 
                        color: "rgb(254, 148, 0)",  
                        fontWeight: "bold",
                        fontSize: { xs: "24px", sm: "36px", md: "48px" }
                    }}
                >
                    ABOUT US
                </Typography>
                
                <Typography 
                    sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "14px", sm: "16px" },
                        color: "rgb(66, 32, 0)",
                        marginTop: "10px",
                        lineHeight: "1.6",
                    }}
                >
                   Welcome to <b style={{ color: "rgb(254, 148, 0)" }}>MONKEY CABS</b>, your trusted car rental service committed to providing reliable, comfortable, and affordable vehicles. Whether you need a car for business trips, family vacations, or daily commutes, we have a diverse fleet to suit your needs.

Our well-maintained vehicles ensure safety, performance, and comfort on every journey. With a seamless booking process, competitive pricing, and no hidden fees, we make car rentals hassle-free.
                </Typography>
            </Box>

            {/* Contact Us Section */}
            <Box 
                sx={{ 
                    maxWidth: "100%", 
                    textAlign: "center", 
                    padding: "3px", 
                    backgroundColor: "rgb(224, 224, 224)"
                }}
            >
                <Typography 
                    variant="h2" 
                    sx={{
                        marginTop:'30px',
                        fontFamily: "'Poppins', sans-serif", 
                        color: "rgb(254, 148, 0)",  
                        fontWeight: "bold",
                        fontSize: { xs: "24px", sm: "36px", md: "48px" }
                    }}
                >
                    CONTACT US
                </Typography>
                
                <Typography 
                    sx={{
                        fontWeight: "bold",
                        fontSize:'12px',
                        color: "rgb(66, 32, 0)",
                        marginTop: "0px",
                        lineHeight: "1.6",
                        marginBottom:'10px'
                    }}
                >
                    Need assistance? Feel free to reach out to us anytime! Our team is available 24/7 to help you with your car rental needs.
                    <br />
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            backgroundColor: "rgb(66, 32, 0)", 
                            marginBottom:'20px', 
                            padding: "10px 20px"
                        }}
                    >
                        <Typography color="white" sx={{ fontFamily: 'revert' }}>
                            <b style={{ color: "rgb(254, 148, 0)" }}>MAIL:</b> support@monkeycabs.in
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;