import api from './apiHelper';

export default class UserData {
    async createUser(newUser) {
        const response = await api('/users', 'POST', newUser);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => data.errors);
        } else {
            throw new Error();
        }
    }

    async getUser(emailAddress, password) {
        const response = await api('/users', 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }
}