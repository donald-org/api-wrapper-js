const { Session, get } = require('../http');

class NavEntry {
    url = '';
    modified = new Date(0);
    created = new Date(0);
    menutext = '';
    raw_menutext = '';
    extra1 = '';
    extra2 = '';
    extra3 = '';
    children = [];
    isProtected = false;

    constructor(url,  modified, created, menutext, raw_menutext, children, isProtected, extra1, extra2, extra3) {
        this.url = url;
        this.modified = modified;
        this.created = created;
        this.menutext = menutext;
        this.raw_menutext = raw_menutext;
        this.children = children.map(entry => new NavEntry(entry.url, entry.modified, entry.created, entry.menutext, entry.raw_menutext, entry.children ?? [], entry.type === 'mams_protected_page', entry.extra1, entry.extra2, entry.extra3));
        this.isProtected = isProtected;
        if (extra1 !== undefined) this.extra1 = extra1;
        if (extra2 !== undefined) this.extra2 = extra2;
        if (extra3 !== undefined) this.extra3 = extra3;
    };
};

/**
 * Gets the navigation bar.
 * @param {Session} session An authenticated session.
 * @returns {Promise<NavEntry[]>} The navigation bar.
 */
async function nav(session) {
    const result = await get('https://www.donald.org/api/nav', session ?? undefined);
    return result.data.map(entry => new NavEntry(entry.url, entry.modified, entry.created, entry.menutext, entry.raw_menutext, entry.children ?? [], entry.type === 'mams_protected_page', entry.extra1, entry.extra2, entry.extra3));
};

module.exports = {
    NavEntry,

    nav
};