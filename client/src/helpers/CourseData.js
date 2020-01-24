import api from './apiHelper';
import Cryptr from 'cryptr';

export default class CourseData {

    constructor() {
        this.cryptr = new Cryptr("UnCrackable");
    }

    async createCourse(newCourse, emailAddress, mima) {
        const password = this.cryptr.decrypt(mima);
        const response = await api('/courses/', 'POST', newCourse, true, {emailAddress, password});
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => data.errors);
        } else {
            throw new Error();
        }
    }

    async getCourse(id='') {
        const response = await api(`/courses/${id}`);
        if (response.status === 200) {
            return response.json().then(data => data);
        } else {
            throw new Error();
        }
    }

    async updateCourse(id, updatedCourse, emailAddress, mima) {
        const password = this.cryptr.decrypt(mima);
        const response = await api(`/courses/${id}`, 'PUT', updatedCourse, true, {emailAddress, password});
        if (response.status === 204) {
            return null;
        } else if (response.status === 400 || response.status === 403) {
            return response.json().then(data => data);
        } else {
            throw new Error();
        }
    }

    async deleteCourse(id, emailAddress, mima) {
        const password = this.cryptr.decrypt(mima);
        const response = await api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            return null;
        } else if (response.status === 403) {
            return response.json().then(data => data.Message);
        } else {
            throw new Error();
        }
    }
}