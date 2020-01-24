import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';

import withContext from './Context';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);



function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <hr />
        <Switch>
          <Route exact path='/' component={CoursesWithContext} />
          <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} />
          <Route exact path='/courses/:id' component={CourseDetailWithContext} />
          <Route exact path='/signin' component={UserSignInWithContext} />
          <Route exact path='/signup' component={UserSignUpWithContext} />
          <Route exact path='/signout' component={UserSignOutWithContext} />
          <Route path='/forbidden' component={Forbidden} />
          <Route path='/error' component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
