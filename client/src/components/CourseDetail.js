import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {

    state = {
        courseDetails: {},
        owner: {}
    }

    componentDidMount = () => {
        const context = this.props.context;
        const courseId = this.props.match.params.id;
        context.courseData.getCourse(courseId)
            .then(course => {
                if (course === null) {
                    this.props.history.push('/not-found');
                } else {
                    this.setState(prevState => ({
                        courseDetails: course,
                        owner: course.owner
                    }));
                }
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            });
    }

    delete = () => {
        const context = this.props.context;
        const courseId = this.props.match.params.id;
        const authUser = context.authenticatedUser;
        
        context.courseData.deleteCourse(courseId, authUser.emailAddress, authUser.mima)
            .then(err => {
                if (err === null) {
                    this.props.history.push('/');
                } else {
                    console.log(err);
                    this.props.history.push('/forbidden');
                }
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            });
    }

    render() {
        const course = this.state.courseDetails;
        const {firstName, lastName} = this.state.owner;
        const courseId = this.props.match.params.id;
        const authUser = this.props.context.authenticatedUser;

        return(
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {(authUser && course.userId === authUser.id) && 
                            <span><Link className="button" to={`/courses/${courseId}/update`}>Update Course</Link><Link className="button" to="#" onClick={ this.delete }>Delete Course</Link></span>
                            }
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        {course.title &&
                            <h3 className="course--title">{ course.title }</h3>
                        }
                        <p>By {`${firstName} ${lastName}`}</p>
                        </div>
                        {course.description &&
                            <div className="course--description">
                                <ReactMarkdown source={course.description} />
                            </div>
                        }
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                {course.estimatedTime &&
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{ course.estimatedTime }</h3>
                                    </li>                                
                                }
                                {course.materialsNeeded &&
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <ul>
                                            <ReactMarkdown source={course.materialsNeeded} />
                                        </ul>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};