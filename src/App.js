import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Timeline from './pages/Timeline';

export default function App() {

  return (
    <UserProvider>
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
    </UserProvider>
  );
}
