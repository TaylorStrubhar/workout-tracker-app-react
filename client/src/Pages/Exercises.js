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
  { name: 'Example 1', focus: 'Arms' },
  { name: 'Example 2', focus: 'Core' },
  { name: 'Example 3', focus: 'Legs' },
];

function generateExercises() {
  return exercises.map(exercise => (
    <ListItem key={exercise.name}>
      <ListItemText primary={`${exercise.name}`} secondary={`${exercise.focus}`} />
      <EditModal exercise={exercise} />
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  ));
}

function Exercises() {
  return (
    <section>
      <Stack spacing={2} direction={'row'}>
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
