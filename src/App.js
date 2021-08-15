import React from 'react';
import Navbar from './components/Navbar';
import {Switch, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home';
import Detail from './pages/Detail';
import MyPokemon from './pages/MyPokemon';

function App() { 

  let location = useLocation()

  console.log(location)

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pokemon/:name">
          <Detail />
        </Route>
        <Route path="/mypokemon">
          <MyPokemon />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
