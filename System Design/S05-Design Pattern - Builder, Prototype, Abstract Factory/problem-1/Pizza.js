class Pizza {
    constructor(size, cheese, pepperoni, mushrooms) {
        this.size = size;
        this.cheese = cheese;
        this.pepperoni = pepperoni;
        this.mushrooms = mushrooms;
    }

    toString() {
        const toppings = [];
        if (this.cheese) toppings.push('cheese');
        if (this.pepperoni) toppings.push('pepperoni');
        if (this.mushrooms) toppings.push('mushrooms');
        
        return `${this.size} pizza with ${toppings.length ? toppings.join(', ') : 'no toppings'}`;
    }
}

module.exports = Pizza;