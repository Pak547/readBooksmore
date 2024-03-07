import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';


function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
