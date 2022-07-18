import { Wifi } from "@prisma/client";
import repoWifi from "../repositories/wifiRepository.js";
import authUtils from "../utils/utils.js";

export type CreateWifiData = Omit<Wifi, "id">;

async function verifyWifiById(id:number,userId:number){
    const wifiExists = await repoWifi.findByIdAndUserId(id, userId);
    if(!wifiExists) throw {type:"not found", message:"wifi not found"};
    return wifiExists;
}

async function verifyWifiByLabel(label:string, userId:number){
    const wifiExists = await repoWifi.findByLabelAndUserId(label, userId);
    if(wifiExists) throw {type:"conflict", message:"this wifi already exist"};
    return;
}

function getDecryptedData(data:Wifi[]){
    data.map((item) => {item.password = authUtils.decryptData(item.password)});
    return data;
}

async function insertWifi(data:CreateWifiData){
    await authUtils.verifyUser(data.userId);
    await verifyWifiByLabel(data.label, data.userId);
    const encryptedPassword = authUtils.encryptData(data.password);
    await repoWifi.insert({...data, password:encryptedPassword});
    return;
}

async function getUserWifi(id:number, userId:number){
    await authUtils.verifyUser(userId);
    
    if(id){
        const wifi = await verifyWifiById(id, userId);
        const decryptedPassword = authUtils.decryptData(wifi.password);
        return ({...wifi, password:decryptedPassword});
    }
    const wifiList = await repoWifi.findByUserId(userId);
    const wifiDecrypted = getDecryptedData(wifiList);
    return wifiDecrypted;
}



const wifiService = {
    insertWifi,
    getUserWifi
};

export default wifiService;