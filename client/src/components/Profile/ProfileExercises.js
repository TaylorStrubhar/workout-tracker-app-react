import React from 'react';
import { useQuery } from '@apollo/client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, Link, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { QUERY_ME } from '../../utils/queries';

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
function ProfileExercises() {
  // Find user data
  const { loading, data } = useQuery(QUERY_ME);

  // Save data, if any, in userData
  const userData = data?.me || {};

  // While still loading, display Loading header
  if (loading) {
    return <CircularProgress />;
  }

  // Pull exercises from userData and set to exercises array
  let loadExercises = userData.exercises.slice(0, 3);
  let totalExercises = userData.exercises.length - 3;

  return (
    <section>
      {/* Create list with exercises */}
      <List sx={{ paddingTop: 0 }}>
        {generateExercises(loadExercises)}{' '}
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
