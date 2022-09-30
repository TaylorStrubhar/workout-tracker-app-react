import React from 'react';
import { Stack } from '@mui/system';
import RoutineCard from '../components/routineCard';
import { AddRoutineModal } from '../components/routineModals';

const routines = [
  {
    name: 'Routine 1',
    id: '1',
    createdAt: 'fakeDate',
    exercises: [
      {
        name: 'Exercise 1',
        focus: 'Arms',
        id: '1',
        sets: 2,
      },
      {
        name: 'Exercise 2',
        focus: 'Legs',
        id: '2',
        sets: 4,
      },
      {
        name: 'Exercise 3',
        focus: 'Core',
        id: '3',
        sets: 3,
      },
      {
        name: 'Exercise 2',
        focus: 'Legs',
        id: '2',
        sets: 4,
      },
      {
        name: 'Exercise 3',
        focus: 'Core',
        id: '3',
        sets: 3,
      },
    ],
  },
  {
    name: 'Routine 2',
    id: '2',
    createdAt: 'fakeDate2',
    exercises: [
      {
        name: 'Exercise 4',
        focus: 'Arms',
        id: '4',
        sets: 7,
      },
      {
        name: 'Exercise 1',
        focus: 'Arms',
        id: '1',
        sets: 2,
      },
      {
        name: 'Exercise 6',
        focus: 'Legs',
        id: '6',
        sets: 5,
      },
    ],
  },
];

const exercises = [
  { name: 'Exercise 1', category: 'Arms', id: '1' },
  { name: 'Exercise 2', category: 'Arms', id: '2' },
  { name: 'Exercise 3', category: 'Legs', id: '3' },
  { name: 'Exercise 4', category: 'Back', id: '4' },
  { name: 'Exercise 5', category: 'Legs', id: '5' },
  { name: 'Exercise 6', category: 'Back', id: '6' },
  { name: 'Exercise 7', category: 'Core', id: '7' },
];

function Routines() {
  return (
    <section>
      <Stack spacing={2} direction={'row'} alignItems={'center'}>
        <h1>My Routines</h1>
        <AddRoutineModal exercises={exercises} />
      </Stack>
      {routines.map(routine => (
        <RoutineCard routine={routine} key={routine.id} />
      ))}
    </section>
  );
}

export default Routines;
