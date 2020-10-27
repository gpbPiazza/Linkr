import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { LoginProvider } from './context/LoginContext';
import { TimelineProvider } from './context/TimelineContext';
import Login from './pages/Login';
import Timeline from './pages/Timeline';


export default function App() {

  return (
    <Router >
      <LoginProvider>
        <TimelineProvider>

          <Switch>
            <Route exact path= "/">
              <Login />
            </Route>

            <Route>
              <Timeline path= '/timeline' />
            </Route>

          </Switch>
        </TimelineProvider>
      </LoginProvider>
    </Router>
  );
}
