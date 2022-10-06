import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, Typography } from '@mui/material';

function generateRoutines(Routines) {
  if (!Routines) {
    return console.log('You have no saved Routines!');
  }

  return Routines.map((routine) => (
    <ListItem key={routine._id} sx={{ padding: 0 }}>
      <ListItemText primary={`${routine.routineName}`} />
    </ListItem>
  ));
}

// Generate page
function ProfileRoutines({ Routines }) {
  // Pull Routines from userData and set to Routines array
  let loadRoutines = Routines.slice(0, 3);
  let totalRoutines = Routines.length - 3;

  return (
    <section>
      {/* Create list with Routines */}
      <List sx={{ paddingTop: 0 }}>
        {generateRoutines(loadRoutines)}
        {totalRoutines > 0 ? (
          <Typography variant='overline'>
            <Link
              href='/Routines'
              sx={{ padding: 0, color: 'gray', textDecoration: 'underlined' }}
            >{`+ ${totalRoutines} more`}</Link>
          </Typography>
        ) : (
          ''
        )}
      </List>
    </section>
  );
}

export default ProfileRoutines;
