import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';

import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import { Stack } from '@mui/system';
import { DELETE_ROUTINE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #1A76D2',
  textAlign: 'center',
  borderRadius: 2,
  boxShadow: 15,
  p: 3,
};

// Add Exercise Modal
function DeleteRoutineModal({ routine }) {
  // Open and close modal state and functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const routineName = routine.routineName;

  const [deleteRoutine, { error }] = useMutation(DELETE_ROUTINE, {
    update(cache, { data: { deleteRoutine } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, routines: [...me.routines, deleteRoutine] } },
        });
      } catch (e) {
        console.error(error);
      }
    },
  });

  // submit delete
  const handleDelete = async event => {
    event.preventDefault();

    try {
      const { data } = await deleteRoutine({
        variables: { id: routine._id },
      });

      console.info(data);
      handleClose();
      return console.log(`Deleted ${routineName}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <IconButton edge="end" aria-label="delete" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal Title/Input */}
          <h4>Are you sure you want to delete:</h4>
          <p>{`${routineName}`}</p>
          {/* Save Button */}

          <Stack direction={'row'} spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button varient="outlined" edge="end" sx={{ p: 0 }} onClick={handleDelete}>
              Delete
            </Button>
            <Button varient="contained" edge="end" sx={{ p: 0 }} onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteRoutineModal;
