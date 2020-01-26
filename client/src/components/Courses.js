import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * renders the home page at route '/'
 */
export default class Courses extends Component {

    state = {
        courses: []
    }

    // retrieves the list of all courses from database
    componentDidMount = () => {
        const {context} = this.props;
        context.courseData.getCourse()
            .then(courseData => {
                this.setState(prevState => ({ courses: courseData }));
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            });
    }

    render() {
        const { courses } = this.state;
        
        return(
            <div className="bounds">
                { courses.length && (
                    <React.Fragment>
                        { courses.map(course => (
                            <div className="grid-33" key={course.id}>
                                <Link className="course--module course--link" to={`/courses/${course.id}`}>
                                    <h4 className="course--label">Course</h4>
                                    <h3 className="course--title">{ course.title }</h3>
                                </Link>
                            </div>
                        ))}
                    </React.Fragment>
                )}
                <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </Link></div>
            </div>
        );
    }
};