const { Session } = require('./http');

const nav = require('./api/nav');
const aküverz = require('./api/aküverz');

module.exports = {
    Session,
    Akü: aküverz.Akü,
    AküVerz: aküverz.AküVerz,
    NavEntry: nav.NavEntry,

    nav: nav.nav,
    aküverz
};