const DeviceFactory = require('./DeviceFactory');
const { AppleLaptop, ApplePhone } = require('./AppleDevices');

class AppleFactory extends DeviceFactory {
    createDevice(type) {
        switch (type.toLowerCase()) {
            case 'laptop':
                return new AppleLaptop();
            case 'phone':
                return new ApplePhone();
            default:
                throw new Error(`Unknown device type: ${type}`);
        }
    }
}

module.exports = AppleFactory;