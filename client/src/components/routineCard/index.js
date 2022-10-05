import * as React from 'react';

import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

// Generate list items from map of exercises array
function card({ exercises }) {
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        Filler Text
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
  </React.Fragment>;
}

function RoutineCard() {
  return (
    <section>
      <h1>Card 1</h1>
      <Card varient="outlined">{card}</Card>
    </section>
  );
}

export default RoutineCard;
