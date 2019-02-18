import React from 'react';
import VideoPlayer from './VideoPlayer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';
import GlobalStyle from '../styles/GlobalStyle';


const App = () => (
  <Router>
    <>
      <Switch>
        <Route exact path="/" component={VideoPlayer} />
        <Route exact path="/:activeVideo" component={VideoPlayer} />
        <Route component={NotFound} />
      </Switch>
      <GlobalStyle />
    </>
  </Router>
)

export default App;