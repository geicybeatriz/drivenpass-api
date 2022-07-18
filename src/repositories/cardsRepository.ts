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

const repoCards = {
    findByLabelAndUserId,
    insertData
}

export default repoCards;