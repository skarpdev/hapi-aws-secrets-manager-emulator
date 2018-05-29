
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
}

module.exports = Secret;
