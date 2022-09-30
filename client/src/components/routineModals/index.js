import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';

import { Stack } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #1A76D2',
  borderRadius: 2,
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
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: 'full',
  alignItems: 'center',
};

const addExerciseStyle = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Exercises = ['Arms', 'Back', 'Cardio', 'Chest', 'Core', 'Full Body', 'Legs', 'Shoulders'];

function EditModal({ exercise }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [category, setCategory] = React.useState(exercise.focus);

  const handleChangeCategory = event => {
    setCategory(event.target.value);
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
          <Stack sx={headerStyle} direction={'row'} spacing={3}>
            {/* Close button */}
            <IconButton edge="start" aria-label="close" onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>

            {/* Modal Title/Input */}
            <TextField defaultValue={exercise.name} variant="standard" />
            {/* Save Button */}
            <Button varient="outlined" edge="end" sx={{ p: 0 }}>
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
                onChange={handleChangeCategory}
              >
                {Exercises.map(exercise => (
                  <MenuItem key={exercise} value={exercise}>
                    {exercise}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

function SelectExerciseModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button fullWidth onClick={handleOpen}>
        Add Exercise
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box style={addExerciseStyle}>
          <Button fullWidth onClick={handleClose}>
            Close Child Modal
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

// Add Exercise Modal
function AddRoutineModal({ exercises }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [category, setCategory] = useState('');

  // const handleChangeCategory = event => {
  //   setCategory(event.target.value);
  // };

  return (
    <div>
      <Button onClick={handleOpen}>+ Routine</Button>

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
            <TextField placeholder="Routine Name" variant="standard" />
            {/* Save Button */}
            <Button varient="outlined" edge="end" sx={{ p: 0 }}>
              Save
            </Button>
          </Stack>

          {/* Select Body Part Focus Form */}
          <Box>
            <SelectExerciseModal />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export { EditModal, AddRoutineModal };
