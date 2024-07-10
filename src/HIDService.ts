import HID from "node-hid"

class HIDService {

    getDevices = async () => {
        return await HID.devicesAsync();
    }

    getDeviceByName = async (deviceName: string) => {
        const path = (await this.getDevices()).find(device => device.manufacturer.toLowerCase().includes(deviceName.toLowerCase())).path;
        return await HID.HIDAsync.open(path)
    }

}

export default new HIDService();