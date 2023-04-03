
const axios = require('axios');

const endpoint = {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    verifyAccessToken: '/auth/verify/access',
}

class Auth {
    #authentication_server_url
    constructor() {
        this.#authentication_server_url = "http://127.0.0.1:8000"; // Default url
    }

    initializeApp(params) {
        if (params.url) {
            this.#authentication_server_url = params.url;
        }
    }

    async createUserWithEmailAndPassword(email, password, optionalFields = {}) {
        var data = JSON.stringify({
            "email": email,
            "password": password,
            "firstName": optionalFields.firstName || null,
            "lastName": optionalFields.lastName || null,
            "phoneNumber": optionalFields.phoneNumber || null,
        });

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.#authentication_server_url + endpoint.register,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const result = await axios(config)
            return result.data;
        } catch (error) {
            if (error.response.status === 403) {
                return error.response.data;
            }
        }
    }

    async signInWithEmailAndPassword(email, password) {
        var data = JSON.stringify({
            "email": email,
            "password": password,
        });

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.#authentication_server_url + endpoint.login,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const result = await axios(config)
            return result.data;
        } catch (error) {
            if (error.response.status === 401) {
                return error.response.data;
            }
        }
    }

    async signOut() {
        // TODO
    }

    async verifyAccessToken(token) {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: this.#authentication_server_url + endpoint.verifyAccessToken,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        };

        try {
            const result = await axios(config)
            return result.data;
        } catch (error) {
            if (error.response.status === 401) {
                return error.response.data;
            }
        }
    }

}

module.exports = new Auth();