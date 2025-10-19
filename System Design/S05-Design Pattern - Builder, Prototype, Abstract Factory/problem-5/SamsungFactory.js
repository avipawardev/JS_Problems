const DeviceFactory = require('./DeviceFactory');
const { SamsungLaptop, SamsungPhone } = require('./SamsungDevices');

class SamsungFactory extends DeviceFactory {
    createDevice(type) {
        switch (type.toLowerCase()) {
            case 'laptop':
                return new SamsungLaptop();
            case 'phone':
                return new SamsungPhone();
            default:
                throw new Error(`Unknown device type: ${type}`);
        }
    }
}

module.exports = SamsungFactory;