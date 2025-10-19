class DeviceFactory {
    createDevice(type) {
        throw new Error("createDevice() method must be implemented");
    }
}

module.exports = DeviceFactory;