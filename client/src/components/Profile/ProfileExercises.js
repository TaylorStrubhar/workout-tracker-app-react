import React from 'react';
import { useQuery } from '@apollo/client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, Link, Typography } from '@mui/material';

function generateExercises(exercises) {
  if (!exercises) {
    return console.log('You have no saved exercises!');
  }

  return exercises.map(exercise => (
    <ListItem key={exercise._id} id={exercise._id} sx={{ padding: 0 }}>
      <ListItemText
        primary={`${exercise.exerciseName}`}
        secondary={`${exercise.exerciseCategory}`}
      />
    </ListItem>
  ));
}

// Generate page
function ProfileExercises({ exercises }) {
  // Pull exercises from userData and set to exercises array
  let loadExercises = exercises.slice(0, 3);
  let totalExercises = exercises.length - 3;

  return (
    <section>
      {/* Create list with exercises */}
      <List sx={{ paddingTop: 0 }}>
        {generateExercises(loadExercises)}
        {totalExercises > 0 ? (
          <Typography variant="overline">
            <Link
              href="/exercises"
              sx={{ padding: 0, color: 'gray', textDecoration: 'underlined' }}
            >{`+ ${totalExercises} more`}</Link>
          </Typography>
        ) : (
          ''
        )}
      </List>
    </section>
  );
}

export default ProfileExercises;
