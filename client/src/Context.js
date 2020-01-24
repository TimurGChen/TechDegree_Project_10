import React, { Component } from 'react';
import CourseData from './helpers/CourseData';
import UserData from './helpers/UserData';
import Cryptr from 'cryptr';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    };

    constructor() {
        super();
        this.courseData = new CourseData();
        this.userData = new UserData();
        // encrypt password as "mima"
        this.cryptr = new Cryptr("UnCrackable");
    }

    signIn = async (emailAddress, password) => {
        const user = await this.userData.getUser(emailAddress, password);
        if (user !== null) {
            user["mima"] = this.cryptr.encrypt(password); // useful in future authentication
            this.setState(prevState => ({authenticatedUser: user}));
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1}); // store credentials in cookies
        }
        return user;
    }

    signOut = () => {
        Cookies.remove('authenticatedUser'); // remove credentials in cookies
        this.setState(prevState => ({ authenticatedUser: null }));
    }

    render() {
        const { authenticatedUser } = this.state;
        const value = {
            authenticatedUser,
            courseData: this.courseData,
            userData: this.userData,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
            }
        };
        return (
            <Context.Provider value={value}>
                { this.props.children }
            </Context.Provider>
        );
    }

}

export const Consumer = Context.Consumer;

/**
 *  Returns the provided component wraped in context consumer (HOC)
 */
const withContext = Component => {
    return (props) => (
        <Context.Consumer>
            {context => <Component {...props} context={context} />}
        </Context.Consumer>
    )
}
export default withContext;