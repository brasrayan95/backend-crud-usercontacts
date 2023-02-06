import { Request, Response } from "express";
import { IContactRequest, IContactUpdate } from "../interfaces/contacts";

import { createContactService, deleteContactService, getContactsService, getOneContactService, listContactsByUserService, updateContactService } from "../services/contacts.services";

const createContactController = async (req: Request, res: Response) => {
    const userId = req.params.id
    const contact : IContactRequest = req.body;
    const createContact = await createContactService(contact, userId)
    return res.status(201).json(createContact)
}

const listContactsByUserController = async (req: Request, res: Response) => {
    const userId = req.params.id
    const contacts = await listContactsByUserService(userId)
    return res.status(200).json(contacts)
}

const getContactsController = async (req: Request, res: Response) => {
    const contacts = await getContactsService();
    return res.status(200).json(contacts)
}

const getOneContactByIdController = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const contact = await getOneContactService(id);
    return res.status(200).json(contact)
}

const updateContactController = async (req: Request, res: Response) => {
    const contact: IContactUpdate = req.body;
    const id: string = req.params.id;
    const updateContact = await updateContactService(contact, id);
    
    return res.status(200).json(updateContact);
}

const deleteContactController = async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await deleteContactService(id);
    return res.status(204).json(result);      
}

export {createContactController, listContactsByUserController, getContactsController, getOneContactByIdController, updateContactController, deleteContactController}