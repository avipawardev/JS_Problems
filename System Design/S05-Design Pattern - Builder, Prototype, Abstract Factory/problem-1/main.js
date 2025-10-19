const PizzaBuilder = require('./PizzaBuilder');

function main() {
    const pizza = new PizzaBuilder()
        .setSize('large')
        .addCheese()
        .addMushrooms()
        .build();

    console.log(pizza.toString());
}

main();