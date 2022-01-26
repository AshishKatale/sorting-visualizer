import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, NavLink, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import BubbleSort from './sorts/BubbleSort';
import CocktailSort from './sorts/CocktailSort';
import InsertionSort from './sorts/InsertionSort';
import MergeSort from './sorts/MergeSort';
import QuickSort from './sorts/QuickSort';
import SelectionSort from './sorts/SelectionSort';

function App() {
  useEffect(() => {
    let id: NodeJS.Timeout;
    let orientationChange = () => window.location.reload();
    if (window.navigator.maxTouchPoints > 0) {
      window.addEventListener("orientationchange", () => {
        clearTimeout(id);
        id = setTimeout(orientationChange, 100);
      });
      return () => window.removeEventListener("orientationchange", orientationChange);
    } else {
      let orientationChange = () => window.location.reload();
      window.addEventListener("resize", () => {
        clearTimeout(id);
        id = setTimeout(orientationChange, 100);
      });
      return () => window.removeEventListener("resize", orientationChange);
    }
  });
  return (
    <Router>
      <div className="container">
        <nav id="nav" className="nav">
          <NavLink exact to="/"
            activeClassName="activeNavlink"
            className="navlink"
          >
            Home
          </NavLink>
          <NavLink
            to="/bubblesort"
            activeClassName="activeNavlink"
            className="navlink"
          >
            BubbleSort
          </NavLink>
          <NavLink
            to="/insertionsort"
            activeClassName="activeNavlink"
            className="navlink"
          >
            InsertionSort
          </NavLink>
          <NavLink
            to="/selectionsort"
            activeClassName="activeNavlink"
            className="navlink"
          >
            SelectionSort
          </NavLink>
          <NavLink
            to="/cocktailsort"
            activeClassName="activeNavlink"
            className="navlink"
          >
            CocktailSort
          </NavLink>
          <NavLink
            to="/quicksort"
            activeClassName="activeNavlink"
            className="navlink"
          >
            QuickSort
          </NavLink>
          <NavLink
            to="/mergesort"
            activeClassName="activeNavlink"
            className="navlink"
          >
            MergeSort
          </NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/bubblesort" component={BubbleSort}></Route>
          <Route path="/insertionsort" component={InsertionSort}></Route>
          <Route path="/selectionsort" component={SelectionSort}></Route>
          <Route path="/cocktailsort" component={CocktailSort}></Route>
          <Route path="/quicksort" component={QuickSort}></Route>
          <Route path="/mergesort" component={MergeSort}></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
