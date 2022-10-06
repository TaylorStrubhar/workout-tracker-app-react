import React, { useEffect, useState } from 'react';

import {
  Button,
  Modal,
  Box,
  Stack,
  TextField,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from '@mui/material';
import { IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const style = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #1A76D2',
  borderRadius: 2,
  boxShadow: 15,
  p: 3,
};

const headerStyle = {
  display: 'flex',
  width: '100%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  justifyContent: 'space-between',
  alignItems: 'center',
};

const formStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'top',
  width: 'full',
  height: '100%',
  bgcolor: 'background.paper',
};

function AddRoutineExercise(props) {
  let userExercises = props.userExercises;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(setExercises);

  let selectedExercises = [];

  function handleCheckedExercise(exercise) {
    let exerciseId = exercise.target.id;

    if (exercise.target.checked) {
      selectedExercises.push(exerciseId);
    } else {
      var index = selectedExercises.indexOf(exerciseId);
      if (index !== -1) {
        selectedExercises.splice(index, 1);
      }
    }

    return selectedExercises;
  }

  function generateUserExercises(userExercises) {
    return userExercises.map(exercise => (
      <ListItem key={exercise._id} id={exercise._id}>
        <ListItemText
          primary={`${exercise.exerciseName}`}
          secondary={`${exercise.exerciseCategory}`}
        />
        <Checkbox onChange={handleCheckedExercise} id={exercise._id} />
      </ListItem>
    ));
  }

  function handleSave() {
    props.parentCallback(selectedExercises);
    handleClose();
  }
  return (
    <div>
      <div>
        <Button onClick={handleOpen} fullWidth>
          Add Exercise
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="Add Routine Modal"
          aria-describedby="Fill out form to add new routine to your saved routines"
        >
          <Box sx={style}>
            <Stack sx={headerStyle} direction={'row'} spacing={3}>
              {/* Close button */}
              <IconButton edge="start" aria-label="close" onClick={handleClose}>
                <HighlightOffIcon />
              </IconButton>
              <h4>Select exercises to add</h4>
              <Button onClick={handleSave}>Save</Button>
            </Stack>
            <FormControl fullWidth>
              <List>{generateUserExercises(userExercises)}</List>
            </FormControl>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AddRoutineExercise;
