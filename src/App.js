import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginProvider } from './context/LoginContext';

import Login from './pages/Login';
import Timeline from './pages/Timeline';
import TimelineId from './pages/TimelineId';
import TimelineHashtag from './pages/TimelineHashtag';
import TimelineMyLikes from './pages/TimelineMyLikes';
import ResetCSS from './styles/ResetCSS';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
  return (  
    <Router>
      <LoginProvider>
          <ResetCSS />
          <GlobalStyle />
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path='/timeline'>
              <Timeline />
            </Route>
            <Route path='/user/:id'>
              <TimelineId />
            </Route>
            <Route path='/hashtag/:hashtag'>
              <TimelineHashtag />
            </Route>
            <Route path='/my-likes'>
              <TimelineMyLikes />
            </Route>
          </Switch>
      </LoginProvider>
    </Router>
  );
}

export default App;