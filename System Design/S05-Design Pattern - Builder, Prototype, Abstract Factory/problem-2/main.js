const GameCharacter = require('./GameCharacter');

function main() {
    const warrior = new GameCharacter("Warrior", 10, "sword");
    const warriorClone = warrior.clone();
    warriorClone.name = "Warrior Clone";

    console.log(warrior.toString());
    console.log(warriorClone.toString());
}

main();