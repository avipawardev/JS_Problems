const AppleFactory = require('./AppleFactory');
const SamsungFactory = require('./SamsungFactory');

function main() {
    const appleFactory = new AppleFactory();
    const samsungFactory = new SamsungFactory();

    const appleLaptop = appleFactory.createDevice('laptop');
    const samsungPhone = samsungFactory.createDevice('phone');

    appleLaptop.specifications();
    samsungPhone.specifications();
}

main();