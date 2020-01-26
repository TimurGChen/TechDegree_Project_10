import React, { Component } from 'react';
import Errors from './Errors';
import Processing from './Processing';

export default class UpdateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        owner: {},
        errors: [],
        isProcessing: false,
    }

    // retrieve the detail information of a course from the database
    componentDidMount = () => {
        const courseId = this.props.match.params.id;
        this.props.context.courseData.getCourse(courseId)
            .then(courseDetail => {
                if (courseDetail === null) {
                    this.props.history.push('/not-found');
                } else {
                    this.setState(prevState => ({
                        title: courseDetail.title,
                        description: courseDetail.description,
                        estimatedTime: courseDetail.estimatedTime || '',
                        materialsNeeded: courseDetail.materialsNeeded || '',
                        owner: courseDetail.owner
                    }));
                }
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            });
    }

    // update the course according to user input
    submit = (e) => {
        e.preventDefault();
        const {title, description, estimatedTime, materialsNeeded} = this.state;
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const courseId = this.props.match.params.id;
        const updatedCourse = {title, userId: authUser.id, description, estimatedTime, materialsNeeded};

        this.setState(prevState => ({isProcessing: true}));
        // timeout allows processing message to render
        setTimeout(() => {
            context.courseData.updateCourse(courseId, updatedCourse, authUser.emailAddress, authUser.mima)
            .then(data => {
                if (data === null) {
                    this.props.history.push('/');
                } else {
                    if (data.message) {
                        // display validation errors
                        this.setState(prevState => ({
                            errors: [data.message],
                            isProcessing: false
                        }));
                    } else {
                        // user's id doesn't match course owner's id
                        this.props.history.push('/forbidden');
                    }
                }
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            });
        }, 100);
    }

    cancel = () => {
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }

    // update the state according to user input
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
            errors,
            owner,
            isProcessing
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
                                <p>By {`${owner.firstName} ${owner.lastName}`}</p>
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
                        {isProcessing ?
                            <Processing />
                            :
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Update Course</button>
                                <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        );
    }
}