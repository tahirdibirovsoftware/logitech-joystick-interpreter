import { SerialPort } from 'serialport';

class SerialService {
    async getSerialDevices() {
        return SerialPort.list();
    }

    async getSerialDevice(deviceName: string) {
        const devices = await this.getSerialDevices();
        return devices.find(device =>
            device.manufacturer.toLowerCase().includes(deviceName.toLowerCase())
        );
    }
}

export default new SerialService();
