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

async function insertWifi(data:CreateWifiData){
    await authUtils.verifyUser(data.userId);
    await verifyWifiByLabel(data.label, data.userId);
    const encryptedPassword = authUtils.encryptData(data.password);
    await repoWifi.insert({...data, password:encryptedPassword});
    return;
}

const wifiService = {
    insertWifi
};

export default wifiService;