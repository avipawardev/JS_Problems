class GameCharacter {
    constructor(name, level, weapon) {
        this.name = name;
        this.level = level;
        this.weapon = weapon;
    }

    clone() {
        return new GameCharacter(this.name, this.level, this.weapon);
    }

    toString() {
        return `${this.name} (Level: ${this.level}, Weapon: ${this.weapon})`;
    }
}

module.exports = GameCharacter;