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

async function deleteData(id:number){
    await client.wifi.delete({
        where:{id: id}
    });
    return;
}

const repoWifi = {
    findByIdAndUserId,
    findByLabelAndUserId,
    findByUserId,
    insert,
    deleteData
}

export default repoWifi;