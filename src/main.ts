import DataInterpreter from "./DataInterpreter";
import HIDService from "./HIDService";


const main = async ()=> {

   (await HIDService.getDeviceByName("log")).on("data", (data)=>{
    console.log(DataInterpreter.engineInterpreter(data))
   })
    
}

main();