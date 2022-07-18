import client from "../config/db.js";
import { CreateWifiData } from "../services/wifiServices";

async function findByIdAndUserId(id:number, userId:number){
    return await client.wifi.findFirst({
        where:{id:id, userId:userId}
    });
}

async function findByLabelAndUserId(label:string, userId:number){
    return await client.wifi.findFirst({
        where:{label:label, userId:userId}
    });
}

async function findByUserId(userId:number){
    return await client.wifi.findMany({
        where:{userId:userId}
    });
}

async function insert(data:CreateWifiData){
    await client.wifi.create({
        data:data
    });
    return;
}

const repoWifi = {
    findByIdAndUserId,
    findByLabelAndUserId,
    findByUserId,
    insert
}

export default repoWifi;