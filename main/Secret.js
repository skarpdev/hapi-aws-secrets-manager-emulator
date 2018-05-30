
class Secret {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }

    getContent() {
        return this.content;
    }

    setContent(value) {
        this.content = value;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    asAnonymous() {
        return {
            name: this.name,
            content: this.content,
            key: this.getLookupKey()
        }
    }

    /**
     * This should be URL safe
     * @returns {string}
     */
    getLookupKey() {
        // just url encoding string is annoying
        // as we then have to take into account that Hapi
        // does url decoding when we receive it back, so
        // base64 seems like an easy win
        return new Buffer(this.name).toString('base64');
    }
}

module.exports = Secret;
