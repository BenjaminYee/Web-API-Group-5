import React from 'react';
import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import CartList from "./components/cart";
import Movie from './components/movie';
import Authentication from './components/authentication';
import {HashRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import FoodList from './components/foodList'
import CheckOut from './components/checkOut'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
        <div>
            <MovieHeader />
            <Route exact path="/" render={()=><h1>WELCOME</h1>}/>
            <Route exact path="/movielist" render={()=><MovieList />}/>
            <Route exact path="/foodlist" render={()=><FoodList />}/>
            <Route exact path="/cart" render={()=><CartList />}/>
            <Route exact path="/movie/:movieId" render={()=><p />}/>
            <Route path="/signin" render={()=><Authentication />}/>
            <Route path="/checkOut" render={()=><CheckOut />}/>

          </div>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
