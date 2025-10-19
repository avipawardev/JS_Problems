const Device = require('./Device');

class SamsungLaptop extends Device {
    specifications() {
        console.log("Samsung Laptop - Galaxy Book Pro with Intel i7, 16GB RAM, 1TB SSD");
    }
}

class SamsungPhone extends Device {
    specifications() {
        console.log("Samsung Phone - Galaxy S23 with Snapdragon 8 Gen 2, 256GB storage");
    }
}

module.exports = { SamsungLaptop, SamsungPhone };