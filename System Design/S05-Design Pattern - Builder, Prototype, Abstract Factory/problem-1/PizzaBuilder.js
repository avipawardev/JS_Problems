const Pizza = require('./Pizza');

class PizzaBuilder {
    constructor() {
        this.size = 'medium';
        this.cheese = false;
        this.pepperoni = false;
        this.mushrooms = false;
    }

    setSize(size) {
        this.size = size;
        return this;
    }

    addCheese() {
        this.cheese = true;
        return this;
    }

    addPepperoni() {
        this.pepperoni = true;
        return this;
    }

    addMushrooms() {
        this.mushrooms = true;
        return this;
    }

    build() {
        return new Pizza(this.size, this.cheese, this.pepperoni, this.mushrooms);
    }
}

module.exports = PizzaBuilder;