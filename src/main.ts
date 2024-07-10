import {ReadlineParser, SerialPort} from "serialport";
import EngineInterpreter from "./interpreter/EngineInterpreter";
import HIDService from "./services/HIDService";


const main = async () => {

   const devices = await SerialPort.list();
   console.log(devices);
   const port  = new SerialPort({
      baudRate: 57600,
      path: '/dev/ttyUSB0'
   });
   const parser = port.pipe(new ReadlineParser());
   (await HIDService.getDeviceByName("log")).on("data", (data)=>{
      const interpretedData  = EngineInterpreter.engineInterpreter(data).toString()
      console.log(interpretedData)
      port.write(interpretedData)
   })
   
 console.log( await HIDService.getDevices())
   
}

main();