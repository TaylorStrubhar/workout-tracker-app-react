import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';

import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';

import { Stack } from '@mui/system';
import { ADD_EXERCISE, QUERY_ME } from '../../utils/mutations';

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

// Add Exercise Modal
function AddExerciseModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [category, setCategory] = useState('');
  const [exerciseName, setExerciseName] = useState('');

  const [formState, setFormState] = useState({
    exerciseName: exerciseName,
    exerciseCategory: category,
  });

  const handleSaveCategory = event => {
    setCategory(event.target.value);
  };

  const handleSaveExerciseName = event => {
    setExerciseName(event.target.value);
  };

  const [addExercise, { error }] = useMutation(ADD_EXERCISE);

  React.useEffect(() => {
    setFormState({
      exerciseName: exerciseName,
      exerciseCategory: category,
    });
  }, [category, exerciseName]);

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addExercise({
        variables: { ...formState },
      });

      handleClose();
      return console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>+ Exercise</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              placeholder="Exercise Name"
              variant="standard"
              value={exerciseName}
              onChange={handleSaveExerciseName}
            />
            {/* Save Button */}
            <Button varient="outlined" edge="end" sx={{ p: 0 }} onClick={handleFormSubmit}>
              Save
            </Button>
          </Stack>

          {/* Select Body Part Focus Form */}
          <Box sx={formStyle}>
            <h4>Body Part</h4>
            <FormControl fullWidth>
              <Select
                labelId="focus-label"
                id="focus"
                value={category}
                onChange={handleSaveCategory}
              >
                {bodyCategories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {error && <div>Signup failed</div>}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddExerciseModal;
