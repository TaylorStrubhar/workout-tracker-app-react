import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { EditModal } from '../components/exerciseModals';
import { AddExerciseModal } from '../components/exerciseModals';

const exercises = [
  { name: 'Example 1', focus: 'Arms', id: '1' },
  { name: 'Example 2', focus: 'Core', id: '2' },
  { name: 'Example 3', focus: 'Legs', id: '3' },
];

function handleDelete(event) {
  console.log(event.target.dataset);
}

// Generate list items from map of exercises array
function generateExercises() {
  return exercises.map(exercise => (
    // List Item
    <ListItem key={exercise.name} id={exercise.id}>
      <ListItemText primary={`${exercise.name}`} secondary={`${exercise.focus}`} />
      {/* Attach modal to list item passing in exercise */}
      <EditModal exercise={exercise} />
      {/* Delete */}
      <IconButton
        edge="end"
        aria-label="delete"
        data-exerciseid={exercise.id}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  ));
}

function Exercises() {
  return (
    <section>
      <Stack spacing={2} direction={'row'} alignItems={'center'}>
        <h1>My Exercises</h1>
        <AddExerciseModal />
      </Stack>
      <TextField fullWidth id="fullWidth" placeholder="Search" />
      <Button fullWidth varient="outlined">
        Filter by Category
      </Button>

      <List>{generateExercises()}</List>
    </section>
  );
}

export default Exercises;
