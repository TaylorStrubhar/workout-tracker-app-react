// import logo from './logo.svg';
// import './App.css';

// import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// import { setContext } from '@apollo/client/link/context';

// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     </ApolloProvider>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Nav from './components/Nav';
import Tabs from './components/Tabs';

function App() {
  const [tabs] = useState([
    { name: 'Profile', description: 'each persons profile' },
    { name: 'Routine', description: 'a routine that people can customize' },
    { name: 'Exercise', description: 'people create their own exercise' },
  ]);
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div className='content'>
      <header>
        <Nav
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        ></Nav>
      </header>
      <main>
        <Tabs currentTab={currentTab}></Tabs>
      </main>
    </div>
  );
}

export default App;
