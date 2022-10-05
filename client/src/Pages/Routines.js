import React from 'react';
import { Stack } from '@mui/system';
import RoutineCard from '../components/routineCard';
import { AddExerciseModal } from '../components/exerciseModals';

function Routines() {
  return (
    <section>
      <Stack spacing={2} direction={'row'} alignItems={'center'}>
        <h1>My Routines</h1>
        <AddExerciseModal />
      </Stack>
      <RoutineCard />
    </section>
  );
}

export default Routines;
