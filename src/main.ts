import { ReadlineParser, SerialPort } from 'serialport';
import EngineInterpreter from './interpreter/EngineInterpreter';
import HIDService from './services/HIDService';
import SerialService from './services/SerialService';

const initializeSerialPort = async (deviceName: string, baudRate: number) => {
    const device = await SerialService.getSerialDevice(deviceName);
    if (!device) {
        throw new Error(`Device with name "${deviceName}" not found.`);
    }
    return new SerialPort({ path: device.path, baudRate });
};

const main = async () => {
    try {
        const port = await initializeSerialPort('1a', 57600);
        const parser = port.pipe(new ReadlineParser());

        const device = await HIDService.getDeviceByName('log');
        device.on('data', (binary: Buffer) => {
            const stringData = EngineInterpreter.interprete(binary).toString();
            port.write(`${stringData}\n`);
        });

        parser.on('data', console.log);
    } catch (error) {
        console.error('Error initializing application:', error);
    }
};

main();
