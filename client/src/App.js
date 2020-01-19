import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Switch
} from 'react-router-dom';

import Courses from './components/Courses';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Courses} />
    </Router>
  );
}

export default App;
