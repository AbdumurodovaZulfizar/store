import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <div>
          <nav>
            <Link to="/">Women</Link>
            <Link to="/men">Men</Link>
            <Link to="/kids">Kids</Link>
          </nav>
        </div>
        <div>
          <nav>
          <div>
            <img src="images/svg3.png" class="" alt='logo'/>
            <img src="img/svg19.png" class="" alt='logo'/>
          </div>
          </nav>
        </div>
        <div>
          
          <i class="fas fa-shopping-cart"></i>
        </div>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
