'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Typography, Stack, Link } from '@mui/material';


const customStyle = {
  backgroundImage: `url(https://media.istockphoto.com/id/1494073860/photo/a-i-chat-with-ai-artificial-intelligence-man-using-a-smartphone-chatting-with-an-intelligent.jpg?s=2048x2048&w=is&k=20&c=VmU3_CE27JvGhikhEITNQfS6Cj7-hJA48KN_mHVGapE=)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100%',
  padding: '20px',
  boxSizing: 'border-box',
};

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  
  if (user) {
    router.push('/support');
  }


  return (
    <Box style={customStyle}>
      
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ color: 'white' }} display={'flex'}>
        <Typography variant="h2" component="h2">
          CareerCompassAI AI Support
        </Typography>
        <Link  style={{ zIndex: 10 }} href="/api/auth/login" underline='none' border={'1px solid blue'} padding={'10px'} borderRadius={'5PX'}>
          Login
        </Link>
      </Stack>

      <Stack sx={{ color: 'white', mt: 2, position: 'relative', zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.7)', margin: '100px', padding: '100px', borderRadius: '10px' }}>
        <Typography variant='h4'>
          Welcome to Career Compass AI virtual assistant.
          Whatever questions you may have, I have got you covered.
          To access the chatbot, please login.
        </Typography>
      </Stack>
    </Box>
  );
}