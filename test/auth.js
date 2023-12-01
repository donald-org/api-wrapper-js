const donald = require('..');
const assert = require('assert');

require('dotenv').config();

const session = new donald.Session(process.env.USRNAME, process.env.PASSWD);

describe('auth', () => {
    it('should authenticate successfully', async () => {
        await session.login().catch(err => assert.fail(err));
    });
});