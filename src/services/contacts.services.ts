import AppDataSource from "../data-source";
import { Contact } from "../entities/contacts.entity";
import { User } from "../entities/user.entity";
import { IContactRequest, IContactUpdate } from "../interfaces/contacts";
import {v4 as uuidv4} from "uuid";
import AppError from "../errors/AppError";

const createContactService = async ({fullname, email, phone} : IContactRequest, userId:string ) => {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = contactRepository.create({
        fullname,
        email,
        phone,
        id: uuidv4(),
        user: {id:userId}
    });

    await contactRepository.save(contact);
    return contact 
}

const listContactsByUserService = async (userId:string) => {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contacts = await contactRepository.findBy({
        user: {id: userId}
    })

    if (!contacts.length) {
        throw new AppError("There's no available contacts.");
    }

    return contacts

}

const getContactsService = async (): Promise<Contact[]> => {
    const contactRepository = AppDataSource.getRepository(Contact)
    const contacts = await contactRepository.find();

    if (!contacts.length) {
        throw new AppError("There's no available contacts.");
    }

    return contacts
}

const getOneContactService = async (id: string) => {
    const contactsRepository = AppDataSource.getRepository(Contact);
    const contact = await contactsRepository.findOneBy({id});

    if (!contact) {
        throw new AppError("Contact not found", 404);
    }

    return contact
}

const updateContactService = async (
    { fullname, email, phone }: IContactUpdate, id: string): Promise <Contact | Array<string | number>> => {
        const contactRepository = AppDataSource.getRepository(Contact);
        const findContact = await contactRepository.findOneBy({
            id,
        });

        if (!findContact) {
            throw new AppError("Contact not found", 404);
        }

        await contactRepository.update(id, {
            fullname: fullname ? fullname : findContact.fullname,
            email: email ? email : findContact.email,
            phone: phone ? phone : findContact.phone,
        });

        const contact = await contactRepository.findOneBy({id});
        return contact!;
}

const deleteContactService = async (id: string) => {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = await contactRepository.findOneBy({id});

    if (!contact) {
        throw new AppError("Contact not found", 404);
    }

    await contactRepository.delete({id})

    return contact;
}






export {createContactService, listContactsByUserService, getContactsService, getOneContactService, updateContactService, deleteContactService}