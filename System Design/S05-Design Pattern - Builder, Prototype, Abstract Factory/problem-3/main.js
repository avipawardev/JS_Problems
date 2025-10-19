const CarBuilder = require('./CarBuilder');

function main() {
    const car = new CarBuilder()
        .setBrand('Tesla Model S')
        .setEngine('electric')
        .setColor('black')
        .addSunroof()
        .addAutomaticTransmission()
        .build();

    console.log(car.toString());
}

main();