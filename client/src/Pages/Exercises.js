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
import DeleteExerciseModal from '../components/exerciseModals/DeleteExercise';

function generateExercises(exercises) {
  if (!exercises) {
    return console.log('You have no saved exercises!');
  }

  return exercises.map(exercise => (
    <ListItem key={exercise._id} id={exercise._id}>
      <ListItemText
        primary={`${exercise.exerciseName}`}
        secondary={`${exercise.exerciseCategory}`}
      />
      <EditExerciseModal exercise={exercise} />
      <DeleteExerciseModal exercise={exercise} />
    </ListItem>
  ));
}

// Generate page
function Exercises() {
  // Find user data
  const { loading, data } = useQuery(QUERY_ME);

  // const [removeExercise] = useMutation(DELETE_EXERCISE);

  // Save data, if any, in userData
  const userData = data?.me || {};

  // While still loading, display Loading header
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Pull exercises from userData and set to exercises array
  let exercises = userData.exercises;

  return (
    <section>
      {/* Header with addExerciseModal */}
      <Stack spacing={2} direction={'row'} sx={{ alignItems: 'center' }}>
        <h1>My Exercises</h1>
        <AddExerciseModal />
      </Stack>
      {/* Search field (non-functional yet) */}
      <TextField fullWidth id="fullWidth" placeholder="Search" />
      {/* Filter button (non-functional yet) */}
      <Button fullWidth varient="outlined">
        Filter by Category
      </Button>

      {/* Create list with exercises */}
      <List>{generateExercises(exercises)}</List>
    </section>
  );
}

export default Exercises;
