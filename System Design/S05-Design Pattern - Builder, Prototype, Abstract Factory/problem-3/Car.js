class Car {
    constructor(brand, engine, color, sunroof, automaticTransmission) {
        this.brand = brand;
        this.engine = engine;
        this.color = color;
        this.sunroof = sunroof;
        this.automaticTransmission = automaticTransmission;
    }

    toString() {
        return `${this.brand} - Engine: ${this.engine}, Color: ${this.color}, Sunroof: ${this.sunroof}, Automatic: ${this.automaticTransmission}`;
    }
}

module.exports = Car;