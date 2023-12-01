const { Session, get } = require('../http');

class Akü {
    id = '';
    title = '';
    year = 0;
    meaning = '';
    explanation = '';
    lastModified = new Date(0);

    constructor(id, title, year, meaning, explanation, lastModified) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.meaning = meaning;
        this.explanation = explanation;
        this.lastModified = lastModified;
    };
};

class AküVerz {
    #aküs = [];

    constructor(aküs) {
        this.#aküs = aküs ?? [];
    };

    list() {
        return this.#aküs.map(akü => akü.id);
    };

    get(id) {
        return this.#aküs.find(akü => akü.id === id);
    };

    lookup(title) {
        return this.#aküs.find(akü => akü.title === title);
    };
};

/**
 * Gets the entire AküVerz.
 * @param {Session} session The session.
 * @returns {Promise<AküVerz>} The AküVerz.
 * @async
 */
async function aküverz(session) {
    const aküArr = [];
    const data = (await get('https://www.donald.org/api/akueverz', session ?? undefined)).data;
    Object.keys(data).forEach(akü => aküArr.push(new Akü(akü, data[akü].title, data[akü].year, data[akü].meaning, data[akü].explanation, new Date(data[akü].lastModified))));
    return new AküVerz(aküArr);
};

aküverz.aküverz = aküverz;
aküverz.Akü = Akü;
aküverz.AküVerz = AküVerz;

module.exports = aküverz;