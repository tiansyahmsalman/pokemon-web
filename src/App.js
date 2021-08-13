import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {GET_POKEMONS} from './graphql/query'
import {useQuery} from '@apollo/client'
import Navbar from './components/Navbar';
import {Switch, Route} from 'react-router-dom'
import Home from './pages/Home';

function App() {

  const gqlVariables = {
    limit: 5,
    offset: 1,
  };
  const {loading, error, data} = useQuery(GET_POKEMONS, {
    variables: gqlVariables
  })

  if (loading) {
    console.log('loading')
  }

  if (error) {
    console.log('error')
  }

  console.log(data)

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
