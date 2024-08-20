'use client'
import { styled } from "@mui/material/styles";
import Sidebar from "./components/Sidebar";
import { Grid, Paper, Box, Button, Container, Typography, Link, TextField } from "@mui/material";
import { useUser, UserButton } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";
import { motion } from "framer-motion";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useRef, useEffect } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { useRouter } from "next/navigation";
import Head from 'next/head';


const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

const pricing1 = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, delay: 1.5 },
  },
};

const pricing2 = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.5 },
  },
};

const imageVariantsLeft = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1 },
  },
};

const imageVariantsRight = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 0.5 }, // Add delay for the right image
  },
};

const settings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 8000,
};

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const sliderRef = useRef(null);

  const gifs = [
    { url: '/assets/1.gif' },
    { url: '/assets/2.gif' },
    { url: '/assets/3.gif' },
    { url: '/assets/4.gif' },
  ];

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ origin: "https://localhost:3000" }),
    });

    if (!checkoutSession.ok) {
      throw new Error(`HTTP error! status: ${checkoutSession.status}`);
    }

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSessionJson.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const [state, handleSubmit1] = useForm("mvgpqypr");
    if (state.succeeded) {
        router.push("/form");
    }

  return (
    <Box className="bg-grid min-h-screen scrollbar">
      {/* <Head>
              { Google Tag Manager }
              dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MTJTHVZN');`,
          }}
        { End Google Tag Manager --> }
      </Head> */}
      <Box sx={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 1900 }}>
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", // Space between Sidebar and the other elements
            alignItems: "center",
          }}
        >
          <Sidebar />
          <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}>
            {/* <UserButton /> */}
        {/* </Box>
          <Box sx={{ display: "flex", alignItems: "center", paddingLeft:165 }}> */}
            <Link href={isSignedIn ? '/generate' : '/sign-in'} passHref>
              <Button 
                sx={{
                  px: 3,
                  py: 1,
                  marginRight: 5,
                  marginTop: -0.75,
                  color: "white",
                  backgroundColor: "#8c52ff",
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#cb6ce6",
                  },
                }}
              >
                Get Started
              </Button>
              <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}>
              <UserButton />
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
      

      <Container maxWidth="lg" sx={{ position: "relative", pt: 10}}>
        <div className="gif-slideshow">
          <Slider ref = {sliderRef} {...settings}>
            {gifs.map((gif, index) => (
              <div key={index} className="gif-slide">
                <img src={gif.url} alt={`Slide ${index + 1}`} width="100%" />
              </div>
            ))}
          </Slider>
        </div>

        <Box sx={{ pt: 5, textAlign: 'center', 
          
        }}>
          <Typography variant='h3' sx={{ pb: 15, fontWeight: 500 }} className="cycle-colors">Pricing</Typography>
          <Container maxWidth="lg" >
            <Grid container spacing={4} justifyContent="center" 
            sx={{'@media (max-width: 900px)': {
            '& > *': {
              mb: 15,
            },
            '& > *:last-child': {
              mb: 0,
            }}}} >
              <Grid item xs={12} md={6} lg={4} marginBottom={10}>
                <Box
                  sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #6a4ca1 40%, #e2ebf0 100%)',
                    p: 4,
                    textAlign: 'center',
                    '&:hover': {
                      backgroundColor: "#a2b3cd",
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',  // Glare effect
                      // filter: 'brightness(1.2)',  // Make the box brighter on hover
                      transform: 'scale(1.02)',}
                  }}
                >
                  <Box
                  sx={{
                    backgroundColor: 'white', 
                    borderRadius: 2,
                    marginTop:-12,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" color="black">
                    Free
                  </Typography>
                  <Typography variant="h3" color="black" sx={{ my: 2 }}>
                    $0
                  </Typography>
                  <Typography variant="body1" color="black" sx={{ mb: 4 }}>
                    PER MONTH
                  </Typography>
                </Box>
                  
                  <Box sx={{ mb: 4, textAlign: 'left' }}>
                  <Typography variant="body1" color="white">
                    ✓ Generate your flashcard from limited PDF uploads, YouTube Video Link or Text.
                    </Typography>
                    <Typography variant="body1" color="white">
                    ✓  5 Flashcard Generation / day
                    </Typography>
                    <Typography variant="body1" color="white">
                    ✓  10 saved flashcard collections
                    </Typography>
                    <Typography variant="body1" color="white">
                    
                    </Typography>
                  </Box>
                  <Link href={isSignedIn ? '/generate' : '/sign-in'} passHref>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'white',
                      color: '#6a4ca1',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }} onClick={handleSubmit}
                  > 
                    Get Started
                  </Button>
                  </Link>
                  
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
              <motion.div variants={pricing2} initial="hidden" animate="visible">
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #076b1a 30%, #e2ebf0 100%)',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
            
                    '&:hover': {
                      backgroundColor: "#a2b3cd",
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',  // Glare effect
                      // filter: 'brightness(1.2)',  // Make the box brighter on hover
                      transform: 'scale(1.02)',
                      
                    },
                  }} 
                >
                  <Box
                  sx={{
                    backgroundColor: 'white', 
                    borderRadius: 2,
                    marginTop:-12,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" color="black">
                    Pro
                  </Typography>
                  <Typography variant="h3" color="black" sx={{ my: 2 }}>
                    $10
                  </Typography>
                  <Typography variant="body1" color="black" sx={{ mb: 4 }}>
                    PER MONTH
                  </Typography>
                </Box>
                  <Box sx={{ mb: 4, textAlign: 'left' ,
                  }}>
                    <Typography variant="body1" color="white">
                    ✓ Generate your flashcard from unlimited PDF uploads, YouTube Video Link or Text.
                    </Typography>
                    <Typography variant="body1" color="white">
                    ✓  Unlimited Flashcard Generation
                    </Typography>
                    <Typography variant="body1" color="white">
                    ✓  Save all your flashcard collections
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'white',
                      color: '#2bb673',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }} onClick={handleSubmit}
                  >
                    Get Plan
                  </Button>
                </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ pt: 10, pb: 5, mt: 2, mb: 10, borderRadius: 3, backgroundColor: "#000000", textAlign: 'center',  }}>
          <Container maxWidth="sm">
          <Typography variant="h3" sx={{ color: "#a2b3cd", pb: 2, align:'center' }} className="cycle-colors">
            Contact Us
          </Typography>
            <Typography variant="h5" sx={{ mb: 3, color: "white" }} >
              Drop down a message below 👇
            </Typography>
            <form onSubmit={handleSubmit1}>
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email Address"
                fullWidth
                margin="normal"
                required
                InputProps={{
                  style: { backgroundColor: "white" }
                }}
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
              />
              <TextField
                id="message"
                name="message"
                label="Your Message"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
                InputProps={{
              style: { backgroundColor: "white" }
            }}
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
              />
              <Button 
                type="submit" 
                disabled={state.submitting}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </form>
          </Container>
        </Box>

        

      </Container>
    </Box>
  );
}
