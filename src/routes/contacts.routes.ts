import { Router } from "express";
import { createContactController, listContactsByUserController, getContactsController, getOneContactByIdController, updateContactController, deleteContactController } from "../controllers/contacts.controllers";
import ensureIsAdmMiddleware from "../middlewares/ensureAdm.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureContactOwnerOrAdmMiddleware from "../middlewares/ensureContactOwnerOrAdm.middleware";

const contactsRoutes = Router();

contactsRoutes.post("/contacts/:id",ensureAuthMiddleware, createContactController);
contactsRoutes.get("/contacts/users/:id", ensureAuthMiddleware, ensureContactOwnerOrAdmMiddleware, listContactsByUserController);
contactsRoutes.get("/contacts", ensureAuthMiddleware, ensureContactOwnerOrAdmMiddleware, getContactsController);
contactsRoutes.get("/contacts/:id", ensureAuthMiddleware, ensureContactOwnerOrAdmMiddleware, getOneContactByIdController);
contactsRoutes.patch("/contacts/:id", ensureAuthMiddleware, ensureContactOwnerOrAdmMiddleware, updateContactController);
contactsRoutes.delete("/contacts/:id", ensureAuthMiddleware, ensureContactOwnerOrAdmMiddleware, deleteContactController);


export default contactsRoutes