import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';

import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  ListItem,
  ListItemText,
  List,
} from '@mui/material';

import AddRoutineExercise from './AddExercises';

import { Stack } from '@mui/system';
import { ADD_ROUTINE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const style = {
  width: 'full',
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #1A76D2',
  borderRadius: 2,
  boxShadow: 15,
  p: 3,
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  bgcolor: 'background.paper',
  borderRadius: 2,
};

const formStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'top',
  width: 'full',
  height: '100%',
  bgcolor: 'background.paper',
};

// Add Routine Modal
function AddRoutineModal({ userData }) {
  // Open and close modal state and functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userExercises = userData.exercises;

  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleSaveName = event => {
    setRoutineName(event.target.value);
  };

  const hanldeCallback = childData => {
    setExercises(childData);
    return exercises;
  };

  const [addRoutine, { error }] = useMutation(ADD_ROUTINE, {
    update(cache, { data: { addRoutine } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, routines: [...me.routines, addRoutine] } },
        });
      } catch (e) {
        console.error(error);
      }
    },
  });

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addRoutine({
        variables: { routineName: routineName, exercises: exercises },
      });

      console.info(data);
    } catch (e) {
      console.error(e);
    }

    handleClose();
  };

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
        {/* <EditExerciseModal exercise={exercise} />
        <DeleteExerciseModal exercise={exercise} /> */}
      </ListItem>
    ));
  }

  return (
    <div>
      <Button onClick={handleOpen}>+ Routine</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add Routine Modal"
        aria-describedby="Fill out form to add new routine to your saved routines"
      >
        <Box sx={style}>
          {/* Top Nav and Input */}
          <Stack sx={headerStyle} direction={'row'} spacing={3}>
            {/* Close button */}
            <IconButton edge="start" aria-label="close" onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>

            {/* Modal Title/Input */}
            <TextField
              placeholder="Routine Name"
              variant="standard"
              name="routineName"
              onChange={handleSaveName}
            />
            {/* Save Button */}
            <Button varient="outlined" edge="end" sx={{ p: 0 }} onClick={handleFormSubmit}>
              Save
            </Button>
          </Stack>
          <AddRoutineExercise userExercises={userExercises} parentCallback={hanldeCallback} />
          <List>{generateExercises(exercises)}</List>
        </Box>
      </Modal>
    </div>
  );
}

export default AddRoutineModal;
