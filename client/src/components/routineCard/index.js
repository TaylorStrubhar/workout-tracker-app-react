import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ListItem, ListItemText, Typography } from '@mui/material';

// Generate list items from map of exercises array
function card({ routine }) {
  const exerciseArr = routine.exercises;
  const displayExercisesArr = [];

  const exercises = () => {
    for (let i = 0; i <= 2; i++) {
      let exercise = exerciseArr[i];
      displayExercisesArr.push(exercise);
    }
    return displayExercisesArr;
  };

  exercises();
  // console.log('Exercises:', routine.exercises);
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" component="div">
          {routine.name}
        </Typography>

        {displayExercisesArr.map(exercise => (
          <ListItem key={exercise.id}>
            <ListItemText primary={`${exercise.sets} x ${exercise.name}`} />
          </ListItem>
        ))}
      </CardContent>
    </React.Fragment>
  );
}

function RoutineCard({ routine }) {
  return (
    <Card varient="outlined" key={routine.id} sx={{ mb: 3 }}>
      {card({ routine })}
    </Card>
  );
}

export default RoutineCard;
