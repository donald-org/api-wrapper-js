const donald = require('..');
const assert = require('assert');

const aküverz = donald.aküverz();

describe('aküverz', () => {
    it('should return an AküVerz', () => {
        aküverz.then(aküverz => assert.equal(aküverz.constructor.name, 'AküVerz'));
    });
});

describe('aküverz-list', () => {
    it('should include "dvdb-2022"', () => {
        aküverz.then(aküverz => assert.ok(aküverz.list().includes('dvdb-2022')));
    });
});

describe('aküverz-get', () => {
    it('should return an Akü', () => {
        aküverz.then(aküverz => assert.equal(aküverz.get('dvdb-2022').constructor.name, 'Akü'));
    });
});

describe('aküverz-akü', () => {
    it('should explain "dvdb-2022" as "Donaldistische Videodatenbank"', () => {
        aküverz.then(aküverz => assert.equal(aküverz.get('dvdb-2022').explanation, 'Donaldistische Videodatenbank'));
    });
});