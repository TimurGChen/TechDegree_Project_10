import React, { Component } from 'react';
import Errors from './Errors';
import Processing from './Processing';

export default class CreateCourse extends Component {

    state = {
      title: null,
      description: null,
      estimatedTime: null,
      materialsNeeded: null,
      errors: [],
      isProcessing: false
    }

    // create a new user in the database
    submit = (e) => {
      e.preventDefault();
      const {
        title, 
        description, 
        estimatedTime, 
        materialsNeeded 
      } = this.state;
      const { context } = this.props;
      const authUser = context.authenticatedUser;
      const userId = authUser.id;
      const newCourse = {title, userId, description, estimatedTime, materialsNeeded};

      this.setState(prevState => ({isProcessing: true}));
      // timeout allows processing message to render
      setTimeout(() => {
        context.courseData.createCourse(newCourse, authUser.emailAddress, authUser.mima )
        .then(errors => {
          if (errors.length) {
            // display validation errors
            this.setState(prevState => ({ 
              errors,
              isProcessing: false 
            }));
          } else {
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.error(err);
          this.props.history.push('/error');
        });
      }, 100);
    }

    // update state according to the input
    change = e => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState(prevState => ({[name]: value}));
    }

    cancel = () => {
      this.props.history.push('/');
    }

    render() {
      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors,
        isProcessing
      } = this.state;

      const authUser = this.props.context.authenticatedUser;

        return(
            <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
              <Errors errors={errors} />
              <form onSubmit={this.submit}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                        value={title || ""} onChange={this.change} /></div>
                    <p>By {`${authUser.firstName} ${authUser.lastName}`}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." value={description || ""} onChange={this.change}></textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                            placeholder="Hours" value={estimatedTime || ""} onChange={this.change} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded || ""} onChange={this.change}></textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
                {isProcessing ?
                  <Processing />
                  :
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={ this.cancel }>Cancel</button>
                  </div>
                }
              </form>
            </div>
          </div>
        );
    }
}