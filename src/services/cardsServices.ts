import {Cards} from "@prisma/client";
import repoCards from "../repositories/cardsRepository.js";
import authUtils from "../utils/utils.js";

export type CreateCardsData = Omit<Cards, "id">;

async function verifyCardByLabel(label:string, userId:number) {
    const cardExists = await repoCards.findByLabelAndUserId(label, userId);
    if(cardExists) throw {type:"conflict", message:"this card already exist!"};
    return
}

async function createCards(data: CreateCardsData){
    await authUtils.verifyUser(data.userId);
    await verifyCardByLabel(data.label, data.userId);

    const encryptedPassword = authUtils.encryptData(data.password);
    const encryptSecurityCode = authUtils.encryptData(data.securityCode);

    await repoCards.insertData({...data, password:encryptedPassword, securityCode:encryptSecurityCode});
    return;
}














const cardsServices = {
    createCards
}

export default cardsServices;