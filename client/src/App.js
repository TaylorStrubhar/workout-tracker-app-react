import './App.css';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; //exercise
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'; //Routine
import LoginIcon from '@mui/icons-material/Login'; // login
import LogoutIcon from '@mui/icons-material/Logout'; // logout
import JoinInnerIcon from '@mui/icons-material/JoinInner'; //sign up
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Profile
import Auth from './utils/auth';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { setContext } from '@apollo/client/link/context';

// import Nav from './components/Nav';
import Profile from './Pages/Profile';
import Exercises from './Pages/Exercises';
import Routines from './Pages/Routines';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Landing from './Pages/Landing';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//  Modal start
const drawerWidth = 240;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
// end

function App(req) {
  //start
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Workout Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={Auth.loggedIn() ? { display: 'display' } : { display: 'none' }}
          >
            <ListItemButton onClick={() => (window.location = `/profile`)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" onClick={() => (window.location = `/profile`)} />
            </ListItemButton>
          </ListItem>
        </List>
        {Auth.loggedIn() ? <Divider /> : ''}
        <List>
          {['Routines', 'Exercises'].map((text, index) => (
            <ListItem
              disablePadding
              sx={Auth.loggedIn() ? { display: 'display' } : { display: 'none' }}
              key={text}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => (window.location = `/${text}`)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <DirectionsRunIcon /> : <FitnessCenterIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0 }}
                  onClick={() => (window.location = `/${text}`)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {Auth.loggedIn() ? <Divider /> : ''}
        <List>
          <ListItem
            disablePadding
            sx={!Auth.loggedIn() ? { display: 'display' } : { display: 'none' }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => (window.location = `/login`)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LoginIcon />
              </ListItemIcon>
              <ListItemText
                primary="Login"
                sx={{ opacity: open ? 1 : 0 }}
                onClick={() => (window.location = `/login`)}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem
            disablePadding
            sx={Auth.loggedIn() ? { display: 'display' } : { display: 'none' }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => Auth.logout()}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ opacity: open ? 1 : 0 }}
                onClick={() => (window.location = `/`)}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={!Auth.loggedIn() ? { display: 'display' } : { display: 'none' }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => (window.location = `/signup`)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <JoinInnerIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sign-up"
                sx={{ opacity: open ? 1 : 0 }}
                onClick={() => (window.location = `/signup`)}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <ApolloProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/routines" element={<Routines />} />
            </Routes>
          </Router>
        </ApolloProvider>
      </Box>
    </Box>
  );
}

export default App;
