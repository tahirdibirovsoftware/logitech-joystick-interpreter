import HID from 'node-hid';

class HIDService {
    private static instance: HIDService;

    private constructor() {}

    public static getInstance(): HIDService {
        if (!HIDService.instance) {
            HIDService.instance = new HIDService();
        }
        return HIDService.instance;
    }

    public async getDevices(): Promise<HID.Device[]> {
        return HID.devices();
    }

    public async getDeviceByName(deviceName: string): Promise<HID.HID> {
        const devices = await this.getDevices();
        const device = devices.find(dev => 
            dev.manufacturer?.toLowerCase().includes(deviceName.toLowerCase())
        );

        if (!device) {
            throw new Error(`Device with name '${deviceName}' not found`);
        }

        if (!device.path) {
            throw new Error(`Device found but path is undefined`);
        }

        return new HID.HID(device.path);
    }
}

export default HIDService.getInstance();
