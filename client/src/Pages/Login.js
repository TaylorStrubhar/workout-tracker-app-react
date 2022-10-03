import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import { Box } from '@mui/system';
import { FormControl, TextField, Button } from '@mui/material';

const Login = props => {
  // Email and Password state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form state
  const [formState, setFormState] = useState({ email: email, password: password });

  // Set formState when email or password is entered
  React.useEffect(() => {
    setFormState({
      email: email,
      password: password,
    });
  }, [email, password]);

  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handlePasswordInput = event => {
    setPassword(event.target.value);
  };

  const handleEmailInput = event => {
    setEmail(event.target.value);
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Box>
      <h2>Login</h2>
      <FormControl>
        <TextField id="emailInput" placeholder="Email" value={email} onChange={handleEmailInput} />
        <TextField
          id="passwordInput"
          type={'password'}
          placeholder="Password"
          value={password}
          onChange={handlePasswordInput}
        />
        <Button onClick={handleFormSubmit}>Submit</Button>
        {error ? `${error}` : ''}
      </FormControl>
    </Box>
  );
};

export default Login;
