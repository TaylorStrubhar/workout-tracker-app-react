import React from 'react';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';

import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import ProfileExercises from '../components/Profile/ProfileExercises';
import Typography from '@mui/material/Typography';

function Profile() {
  return (
    <section>
      <Stack spacing={2} direction={'row'} sx={{ alignItems: 'center' }}>
        <Typography variant="h6">My Exercises</Typography>
        <Button onClick={() => (window.location = '/exercises')}>
          See all <NavigateNextRoundedIcon />
        </Button>
      </Stack>
      <ProfileExercises />
    </section>
  );
}

export default Profile;
