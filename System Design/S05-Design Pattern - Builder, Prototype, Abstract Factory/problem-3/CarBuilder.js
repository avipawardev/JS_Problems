const Car = require('./Car');

class CarBuilder {
    constructor() {
        this.brand = '';
        this.engine = '';
        this.color = '';
        this.sunroof = false;
        this.automaticTransmission = false;
    }

    setBrand(brand) {
        this.brand = brand;
        return this;
    }

    setEngine(engine) {
        this.engine = engine;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    addSunroof() {
        this.sunroof = true;
        return this;
    }

    addAutomaticTransmission() {
        this.automaticTransmission = true;
        return this;
    }

    build() {
        return new Car(this.brand, this.engine, this.color, this.sunroof, this.automaticTransmission);
    }
}

module.exports = CarBuilder;