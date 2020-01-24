import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Errors from './Errors';

export default class UserSignIn extends Component {

    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    submit = (e) => {
        e.preventDefault();
        const {emailAddress, password} = this.state;
        const { from } = this.props.location.state || {from: {pathname: '/'}};
        this.props.context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    this.setState(prevState => ({errors: ["Invalid email or password"]}));
                } else {
                    this.props.history.push(from);
                }
            })
            .catch(err => {
                console.error(err);
                this.props.history.push('/error');
            });
    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({[name]: value}));
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {
            emailAddress,
            password,
            errors
        } = this.state;

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <Errors errors={errors} />
                        <form onSubmit={this.submit}>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change} value={emailAddress} /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change} value={password} /></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit" >Sign In</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>                    
                </div>
            </div>
        );
    }
}