import React, { Component } from 'react';
import Errors from './Errors';

export default class UpdateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    componentDidMount = () => {
        const courseId = this.props.match.params.id;
        this.props.context.courseData.getCourse(courseId)
            .then(courseDetail => {
                this.setState(prevState => ({
                    title: courseDetail.title,
                    description: courseDetail.description,
                    estimatedTime: courseDetail.estimatedTime || '',
                    materialsNeeded: courseDetail.materialsNeeded || ''
                }));
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            });
    }

    submit = (e) => {
        e.preventDefault();
        const {title, description, estimatedTime, materialsNeeded} = this.state;
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const courseId = this.props.match.params.id;
        const updatedCourse = {title, userId: authUser.id, description, estimatedTime, materialsNeeded};
        context.courseData.updateCourse(courseId, updatedCourse, authUser.emailAddress, authUser.mima)
            .then(message => {
                if (message === null) {
                    this.props.history.push('/');
                } else {
                    console.log(message);
                    this.props.history.push('/forbidden');
                }
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({[name]: value}));
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form onSubmit={this.submit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <Errors errors={errors} />
                                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                    value={title} onChange={this.change} /></div>
                                <p>By Joe Smith</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={this.change}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                            placeholder="Hours" value={estimatedTime} onChange={this.change} /></div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={this.change}>
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
                    </form>
                </div>
            </div>
        );
    }
}