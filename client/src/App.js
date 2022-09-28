import './App.css';
import React from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import Profile from './Pages/Profile';

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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <header>
          <Nav />
        </header>
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
