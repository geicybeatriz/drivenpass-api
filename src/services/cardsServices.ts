import {Cards} from "@prisma/client";
import repoCards from "../repositories/cardsRepository.js";
import authUtils from "../utils/utils.js";

export type CreateCardsData = Omit<Cards, "id">;

async function verifyCardByLabel(label:string, userId:number) {
    const cardExists = await repoCards.findByLabelAndUserId(label, userId);
    if(cardExists) throw {type:"conflict", message:"this card already exist!"};
    return
}

function getDecryptedCards(cards:Cards[]){
    cards.map(card => {
        card.password = authUtils.decryptData(card.password);
        card.securityCode = authUtils.decryptData(card.securityCode);
    });
    return cards;
}

async function createCards(data: CreateCardsData){
    await authUtils.verifyUser(data.userId);
    await verifyCardByLabel(data.label, data.userId);

    const encryptedPassword = authUtils.encryptData(data.password);
    const encryptSecurityCode = authUtils.encryptData(data.securityCode);

    await repoCards.insertData({...data, password:encryptedPassword, securityCode:encryptSecurityCode});
    return;
}

async function getCardsByUser(id:number, userId:number){
    await authUtils.verifyUser(userId);
    
    if(id){
        const card = await repoCards.findByIdAndUser(id, userId);
        if(!card) throw {type:"not found", message:"card not found"};
        const decryptedPassword = authUtils.decryptData(card.password);
        const decryptedSecurityCode = authUtils.decryptData(card.securityCode);
        return ({...card, password:decryptedPassword, securityCode:decryptedSecurityCode}); 
    }

    const cards = await repoCards.findByUser(userId);
    console.log(cards);
    const cardsDecrypted = getDecryptedCards(cards);
    return cardsDecrypted;
}

async function deleteCardById(id:number, userId:number){
    await authUtils.verifyUser(userId);

    const cardExists = await repoCards.findByIdAndUser(id, userId);
    if(!cardExists) throw {type:"not found", message:"card not found"};
    
    await repoCards.deleteCard(id);
    return;
}

const cardsServices = {
    createCards,
    getCardsByUser,
    deleteCardById
}

export default cardsServices;