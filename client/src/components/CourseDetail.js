import React, { Component } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';

export default class CourseDetail extends Component {

    state = {
        courseDetails: {}
    }

    url = apiBaseUrl + `courses/1`;

    componentDidMount() {
        axios.get(url)
            .then( response => this.setState(prevState => ({
                courseDetails: response.data,
            })))
            .catch(err => console.error(`Error fetching and parsing data: ${err}`));
    }

    // handles the actions of the delete & update buttons
    handleUpdate() {

    }

    handleDelete() {

    }

    render() {
        const course = this.state.course;

        return(
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                            className="button button-secondary" href="index.html">Return to List</a>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{ course.title }</h3>
                        <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                            { course.description.split('\n\n').map((sentence, index) => (
                                <p key={ index }>
                                    { sentence }
                                </p>    
                            )) }
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{ course.estimatedTime }</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        { course.materialsNeeded.replace('* ', '').split('\n').map((item, index) => (
                                            <li>
                                                { item }
                                            </li>
                                        )) }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};