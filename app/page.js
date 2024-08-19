
'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import Head from "next/head";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    });
    const checkoutSessionJson = await checkoutSession.json();
  
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });
  
    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static" sx={{backgroundColor: '#6A0DAD'}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} >Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{
        textAlign: 'center',
        my: { xs: 2, md: 4 },
        backgroundColor: '#f0f4f7',
        p: { xs: 2, md: 4 },
        borderRadius: 2
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant='contained' sx={{ mt: 2, backgroundColor: '#6A0DAD', color: 'white', px: { xs: 4, md: 6 }, py: { xs: 1, md: 2 } }}>
          <a href="/generate" style={{ color: 'inherit', textDecoration: 'none' }}>Get Started</a>
        </Button>
      </Box>

      <Box sx={{ my: { xs: 4, md: 6 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
              Easy Text Input
            </Typography>
            <Typography>
              Simply input your text and let our software do the rest. Creating flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
              Smart Flashcards
            </Typography>
            <Typography>
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
              Accessible Anywhere
            </Typography>
            <Typography>
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: { xs: 4, md: 6 }, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#e0f7fa',
                textAlign: 'center'
              }}>
              <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' } }}>
                Basic
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                $5 / month
              </Typography>
              <Typography>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained"   sx={{ mt: 2, backgroundColor: '#007bff', color: 'white', px: { xs: 3, md: 5 }, py: { xs: 1, md: 2 } }} >
                Choose Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#fff3e0',
                textAlign: 'center'
              }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.25rem', md: '1.75rem' } }}>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                $10 / month
              </Typography>
              <Typography>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" sx={{ mt: 2, backgroundColor: '#ff5722', color: 'white', px: { xs: 3, md: 5 }, py: { xs: 1, md: 2 } }} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
