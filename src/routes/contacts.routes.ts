import { Router } from "express";
import { createContactController, listContactsByUserController, getContactsController, getOneContactByIdController, updateContactController, deleteContactController } from "../controllers/contacts.controllers";
//controllers
//middlewares


const contactsRoutes = Router();

contactsRoutes.post("/contacts/:id", createContactController);
contactsRoutes.get("/contacts/users/:id", listContactsByUserController);
contactsRoutes.get("/contacts", getContactsController);
contactsRoutes.get("/contacts/:id", getOneContactByIdController);
contactsRoutes.patch("/contacts/:id", updateContactController);
contactsRoutes.delete("/contacts/:id", deleteContactController);


export default contactsRoutes