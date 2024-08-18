

import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <Container maxWidth="sm">
      <AppBar position="static" sx={{ backgroundColor: '#6A0DAD' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <Button
            sx={{
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              borderRadius: '30px',
              color: 'white',
              px: 3,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#FE6B8B',
                transform: 'scale(1.1)',
                boxShadow: '0 3px 15px 5px rgba(255, 105, 135, .3)',
              },
            }}
          >
            <Link href="/sign-in" passHref>
              Login
            </Link>
          </Button>
          <Button
            sx={{
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              borderRadius: '30px',
              color: 'white',
              px: 3,
              ml: 2,
              boxShadow: '0 3px 5px 2px rgba(138, 43, 226, .3)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#8E44AD',
                transform: 'scale(1.1)',
                boxShadow: '0 3px 15px 5px rgba(138, 43, 226, .3)',
              },
            }}
          >
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center', my: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
