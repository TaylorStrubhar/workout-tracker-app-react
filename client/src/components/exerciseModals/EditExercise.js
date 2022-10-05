import * as React from 'react';
import { useState } from 'react';

import { useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';

import { Stack } from '@mui/system';

import { UPDATE_EXERCISE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #1A76D2',
  borderRadius: 2,
  boxShadow: 15,
  p: 3,
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: 'full',
  alignItems: 'center',
};

const formStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: 'full',
  alignItems: 'center',
};

const bodyCategories = [
  'Arms',
  'Back',
  'Cardio',
  'Chest',
  'Core',
  'Full Body',
  'Legs',
  'Shoulders',
];

function EditExerciseModal({ exercise }) {
  // Open state of modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form state, holds exercise information
  const [formState, setFormState] = useState({
    exerciseName: exercise.exerciseName,
    exerciseCategory: exercise.exerciseCategory,
  });

  // Set formState with updated values
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // UpdateExercise mutation
  const [updateExercise, { error }] = useMutation(UPDATE_EXERCISE, {
    update(cache, { data }) {
      try {
        // Rewrite cache with updated exercise
        const { me } = cache.readQuery({ query: QUERY_ME });

        // Cached exercises
        let userExercises = me.exercises;

        // Exercise to update
        let updateExercise = data.updateExercise;

        // Map function to find exercise in cache and swap
        const updatedExerciseArray = userExercises.map(exercise => {
          // Find exercise to update
          if (exercise._id === updateExercise._id) {
            // Replace with new data passed in from form state
            return { __typename: 'Exercise', id: exercise._id, ...formState };
          }

          return exercise;
        });

        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...me,
              exercises: updatedExerciseArray,
            },
          },
        });
      } catch (e) {
        console.error(error);
      }
    },
  });

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await updateExercise({
        variables: { updateExerciseId: exercise._id, input: { ...formState } },
      });
      handleClose();

      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <IconButton aria-label="edit" onClick={handleOpen}>
        <EditIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Top Nav and Input */}
          <FormControl>
            <Stack sx={headerStyle} direction={'row'} spacing={3}>
              {/* Close button */}
              <IconButton edge="start" aria-label="close" onClick={handleClose}>
                <HighlightOffIcon />
              </IconButton>

              {/* Modal Title/Input */}
              <TextField
                id="exerciseNameInput"
                name="exerciseName"
                defaultValue={exercise.exerciseName}
                variant="standard"
                onChange={handleChange}
              />
              {/* Save Button */}
              <Button onClick={handleFormSubmit} varient="outlined" edge="end" sx={{ p: 0 }}>
                Save
              </Button>
            </Stack>

            {/* Select Body Part Focus Form */}
            <Box sx={formStyle}>
              <h4>Body Part</h4>
              <FormControl fullWidth>
                <Select
                  id="exerciseCategoryInput"
                  name="exerciseCategory"
                  defaultValue={exercise.exerciseCategory}
                  variant="standard"
                  onChange={handleChange}
                >
                  {bodyCategories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

export default EditExerciseModal;
