import client from "../config/db.js";
import { CreateCardsData } from "../services/cardsServices.js";


async function findByLabelAndUserId(label:string, userId:number){
    return await client.cards.findFirst({
        where:{label, userId}
    });
}

async function insertData(data:CreateCardsData){
    await client.cards.create({
        data: data
    });
    return;
}

async function findByIdAndUser(id:number, userId:number){
    return await client.cards.findFirst({
        where:{id, userId}
    });
}

async function findByUser(userId:number){
    return await client.cards.findMany({
        where:{userId}
    });
}

async function deleteCard(id:number){
    await client.cards.delete({
        where:{id:id}
    });
    return;
}


const repoCards = {
    findByLabelAndUserId,
    insertData,
    findByIdAndUser,
    findByUser,
    deleteCard
}

export default repoCards;