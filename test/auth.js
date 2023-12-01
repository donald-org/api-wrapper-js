require('dotenv').config();
const donald = require('..');
const assert = require('assert');

const session = new donald.Session(process.env.USRNAME, process.env.PASSWD);

describe('auth', () => {
    it('should authenticate successfully', async () => {
        await session.login().catch(err => assert.fail(err));
    });
});