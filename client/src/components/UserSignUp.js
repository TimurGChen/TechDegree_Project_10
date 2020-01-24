import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Errors from './Errors';

export default class UserSignUp extends Component {

    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        errors: []
    }

    submit = async (e) => {
        e.preventDefault();
        const { context } = this.props;
        const { firstName, 
            lastName, 
            emailAddress, 
            password, 
            confirmPassword} = this.state;

        if (password === confirmPassword) {
            const newUser = {firstName, lastName, emailAddress, password};
            context.userData.createUser(newUser)
                .then(errors => {
                    if (errors.length) {
                        this.setState({errors});
                    } else {
                        context.actions.signIn(emailAddress, password)
                            .then(() => {
                                this.props.history.push('/');
                            })
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.props.history.push('/error');
                });
        } else {
            this.setState(prevState => ({errors: [`"Confirm Password" must match "Password"`]}));
        }
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
            firstName, 
            lastName, 
            emailAddress, 
            password, 
            confirmPassword,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <Errors errors={errors} />
                        <form onSubmit={this.submit}>
                            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={firstName} onChange={this.change} /></div>
                            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={lastName} onChange={this.change} /></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} onChange={this.change} /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={this.change} /></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={confirmPassword} onChange={this.change} /></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit" >Sign Up</button><button className="button button-secondary" onClick={ this.cancel }>Cancel</button></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    }
} 