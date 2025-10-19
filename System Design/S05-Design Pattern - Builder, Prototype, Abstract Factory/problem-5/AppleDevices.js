const Device = require('./Device');

class AppleLaptop extends Device {
    specifications() {
        console.log("Apple Laptop - MacBook Pro with M2 chip, 16GB RAM, 512GB SSD");
    }
}

class ApplePhone extends Device {
    specifications() {
        console.log("Apple Phone - iPhone 14 with A16 Bionic chip, 128GB storage");
    }
}

module.exports = { AppleLaptop, ApplePhone };