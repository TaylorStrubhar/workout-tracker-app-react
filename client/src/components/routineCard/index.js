import * as React from 'react';
import { useQuery } from '@apollo/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ListItem, ListItemText, Typography } from '@mui/material';
import { DeleteRoutineModal } from '../routineModals';

import { QUERY_ROUTINE } from '../../utils/queries';

// Generate list items from map of exercises array
function card({ routine }) {
  const exerciseArr = routine.exercises;
  // console.log(exerciseArr);
  const displayExercisesArr = [];

  const exercises = () => {
    switch (exerciseArr.length) {
      case 0:
        console.log('you have no exercises in this routine');
        break;
      case 1:
        displayExercisesArr.push(exerciseArr[0]);
        break;
      case 2:
        displayExercisesArr.push(exerciseArr[0], exerciseArr[1]);
        break;
      default:
        for (let i = 0; i <= 2; i++) {
          let exercise = exerciseArr[i];
          displayExercisesArr.push(exercise);
        }
    }

    return displayExercisesArr;
  };

  exercises();
  // console.log(routine);
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          {routine.routineName}
          <DeleteRoutineModal routine={routine} />
        </Typography>

        {displayExercisesArr.map(exercise => (
          <ListItem key={exercise._id}>
            <ListItemText primary={`${exercise.exerciseName}`} />
          </ListItem>
        ))}
      </CardContent>
    </React.Fragment>
  );
}

function RoutineCard({ routine }) {
  let routineId = routine._id;
  const { loading, data } = useQuery(QUERY_ROUTINE, {
    variables: { id: routineId },
  });

  if (loading) {
    return <h3>Loading...</h3>;
  }

  const routineData = data;

  return (
    <Card varient="outlined" sx={{ mb: 3 }}>
      {card(routineData)}
    </Card>
  );
}

export default RoutineCard;
