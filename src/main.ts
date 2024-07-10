import { ReadlineParser, SerialPort } from 'serialport';
import EngineInterpreter from "./interpreter/EngineInterpreter";
import HIDService from "./services/HIDService";

const THROTTLE_DELAY_MS = 0; // Adjust this value to suit your device's requirements

const main = async () => {
    try {
        const devices = await SerialPort.list();
        console.log('Serial Devices:', devices);

        const port = new SerialPort({
            baudRate: 230400,
            path: '/dev/ttyUSB0'
        });

        port.on('open', () => {
            console.log('Serial Port Opened');
        });

        port.on('error', (err) => {
            console.error('Serial Port Error:', err);
        });

        const parser = port.pipe(new ReadlineParser());

        const hidDevice = await HIDService.getDeviceByName("log");
        console.log('HID Device:', hidDevice);

        let lastTransmissionTime = 0;

        hidDevice.on("data", (data) => {
            try {
                const currentTime = Date.now();
                if (currentTime - lastTransmissionTime >= THROTTLE_DELAY_MS) {
                    const interpretedData = EngineInterpreter.interprete(data).toString();
                    console.log('Interpreted Data:', interpretedData);

                    port.write(interpretedData, (err) => {
                        if (err) {
                            console.error('Error writing to serial port:', err);
                        } else {
                            console.log('Data written to serial port:', interpretedData);
                        }
                    });

                    lastTransmissionTime = currentTime;
                }
            } catch (error) {
                console.error('Error interpreting data:', error);
            }
        });

        console.log('Available HID Devices:', await HIDService.getDevices());
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main();
