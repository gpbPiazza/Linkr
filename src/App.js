import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { LoginProvider } from './context/LoginContext';

import Login from './pages/Login';
import Timeline from './pages/Timeline';
import TimelineId from './pages/TimelineId';


export default function App() {

  return (  
    <Router >
      <LoginProvider>
          <Switch>
            <Route exact path= "/">
              <Login />
            </Route>

            <Route>
              <Timeline path= '/timeline' />
            </Route>

            <Route exact path='/user/:id'>
              <TimelineId />
            </Route>

            <Route exact path='/hashtag/:hashtag'>
              <TimelineHashTag />
            </Route>

          </Switch>
      </LoginProvider>
    </Router>
  );
}
