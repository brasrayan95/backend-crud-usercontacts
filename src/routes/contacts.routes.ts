import { Router } from "express";
import { createContactController, listContactsByUserController, getContactsController, getOneContactByIdController, updateContactController, deleteContactController } from "../controllers/contacts.controllers";
import ensureIsAdmMiddleware from "../middlewares/ensureAdm.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const contactsRoutes = Router();

contactsRoutes.post("/contacts/:id",ensureAuthMiddleware, createContactController);
contactsRoutes.get("/contacts/users/:id", ensureAuthMiddleware, listContactsByUserController);
contactsRoutes.get("/contacts", ensureAuthMiddleware, ensureIsAdmMiddleware, getContactsController);
contactsRoutes.get("/contacts/:id", ensureAuthMiddleware, getOneContactByIdController);
contactsRoutes.patch("/contacts/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, updateContactController);
contactsRoutes.delete("/contacts/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, deleteContactController);


export default contactsRoutes