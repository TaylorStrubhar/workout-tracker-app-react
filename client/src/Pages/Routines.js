import React from 'react';
import { Stack } from '@mui/system';
import RoutineCard from '../components/routineCard';
import { AddRoutineModal } from '../components/routineModals';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CircularProgress } from '@mui/material';

import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

function generateRoutines(routines) {
  if (!routines) {
    return console.log('You have no saved routines!');
  }

  return routines.map(routine => (
    <ListItem key={routine._id} id={routine._id}>
      <ListItemText
        primary={`${routine.routineName}`}
        // secondary={`${routine.exercises}`}
      />
      {/* <EditExerciseModal exercise={exercise} />
      <DeleteExerciseModal exercise={exercise} /> */}
    </ListItem>
  ));
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
        <AddRoutineModal />
      </Stack>
      {/* <RoutineCard {...generateRoutines(routines)} /> */}
      <List>{generateRoutines(routines)}</List>
    </section>
  );
}

export default Routines;
