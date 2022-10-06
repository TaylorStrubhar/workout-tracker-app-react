import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
// import CssBaseLine from '@mui/material/CssBaseline';

const Landing = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
    <Typography variant="h3" textAlign="center">
      Welcome to Workout Tracker!
    </Typography>
    <Typography variant='h6' textAlign="center" marginTop="30px">
      To get started, please click the hamburger icon to open the menu and click signup to get started!
    </Typography>
    </Box>
  );
}
export default Landing;