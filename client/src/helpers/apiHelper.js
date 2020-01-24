import config from '../config';

export default (path, method='GET', body=null, requiresAuth=false, credentials=null) => {
    const url = config.apiBaseUrl + path;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
};