import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import Timeline from './pages/Timeline';

export default function App() {

  return (
    <Router >

      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route>
          <Timeline path= '/timeline'/>
        </Route>
      </Switch>
    </Router>
  );
}
