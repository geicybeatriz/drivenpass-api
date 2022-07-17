import client from "../config/db.js";
import { CreateNotesData } from "../services/notesServices.js";

async function findByLabelAndUser(label:string, userId:number){
    return await client.secretNotes.findFirst({
        where:{
            label, userId
        }
    });
}

async function insertNotes(data:CreateNotesData){
    await client.secretNotes.create({
        data: data
    });
    return;
}

const repoNotes = {
    findByLabelAndUser,
    insertNotes
};

export default repoNotes;