import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { EditExerciseModal, AddExerciseModal } from '../components/exerciseModals';

import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries';

function generateExercises(exercises) {
  if (!exercises) {
    return console.log('You have no saved exercises!');
  }

  return exercises.map(exercise => (
    <ListItem key={exercise._id}>
      <ListItemText
        primary={`${exercise.exerciseName}`}
        secondary={`${exercise.exerciseCategory}`}
      />
      <EditExerciseModal exercise={exercise} />
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  ));
}

function Exercises() {
  const { loading, data } = useQuery(QUERY_ME);

  // const [removeExercise] = useMutation(DELETE_EXERCISE);

  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  let exercises = userData.exercises;

  console.log(exercises);

  return (
    <section>
      <Stack spacing={2} direction={'row'} sx={{ alignItems: 'center' }}>
        <h1>My Exercises</h1>
        <AddExerciseModal />
      </Stack>
      <TextField fullWidth id="fullWidth" placeholder="Search" />
      <Button fullWidth varient="outlined">
        Filter by Category
      </Button>

      <List>{generateExercises(exercises)}</List>
    </section>
  );
}

export default Exercises;
