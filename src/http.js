const axios = require('axios');

/**
 * Represents a session.
 */
class Session {
    #username = '';
    #password = '';
    #cookies = '';

    /**
     * Creates a new session.
     * @param {string} username The username.
     * @param {string} password The password.
     */
    constructor(username, password) {
        this.#username = username;
        this.#password = password;
    };

    /**
     * Performs a login.
     */
    async login() {
        const response = await get('https://www.donald.org/api/mitglieder/login');
        this.#cookies = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
        const params = JSON.parse(JSON.stringify(response.data).replace('{{username}}', this.#username).replace('{{password}}', this.#password));
        const formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));
        const result = (await post('https://www.donald.org/api/mitglieder/login', formData, this)).data;
        if (result.error !== null) throw new Error(`[${result.error.code} ${result.error.message}] ${result.error.reason}`);
        return this;
    };

    /**
     * Ends the session.
     * You have to call the login method again to use the session.
     */
    async end() {
        await get('https://www.donald.org/mams/logout/143', this);
        return this;
    };

    get cookies() {
        return this.#cookies;
    };

    set cookies(cookies) {};
};

function get(url, session) {
    if (session === undefined) return axios.get(url); else return axios.get(url, { headers: { Cookie: session.cookies } });
};

function post(url, data, session) {
    if (session === undefined) return axios.post(url, data); else return axios.post(url, data, { headers: { Cookie: session.cookies } });
};

module.exports = {
    Session,

    get,
    post
};