import React from 'react';
import { Stack } from '@mui/system';
import RoutineCard from '../components/routineCard';
import { AddRoutineModal } from '../components/routineModals';

import List from '@mui/material/List';

import { CircularProgress } from '@mui/material';

import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

function generateRoutines(routines) {
  if (!routines) {
    return console.log('You have no saved routines!');
  }

  return routines.map(routine => <RoutineCard key={routine._id} routine={routine} />);
}

function Routines() {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (loading) {
    return <CircularProgress />;
  }

  let routines = userData.routines;

  return (
    <section>
      <Stack spacing={2} direction={'row'} alignItems={'center'}>
        <h1>My Routines</h1>
        <AddRoutineModal userData={userData} />
      </Stack>

      <List>{generateRoutines(routines)}</List>
    </section>
  );
}

export default Routines;
