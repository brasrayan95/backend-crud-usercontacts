import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Contact } from "../entities/contacts.entity";
import { User } from "../entities/user.entity";

const ensureContactOwnerOrAdmMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const contactRepository = AppDataSource.getRepository(Contact);
    const contacts = await contactRepository.find({
      where: {id: req.params.id}, relations: {user: true}})
    const usersRepository = AppDataSource.getRepository(User);
    const user = await usersRepository.findOneBy({id: req.user.id})
    let isOwner = false
    let isUser = req.user.id === req.params.id

    if (contacts.length > 0) {
        isOwner = user!.id === contacts[0].user.id
    }
    

    if (!(req.user.isAdm || isOwner || isUser)) {
        return res.status(403).json({
          message: "User has no permission to do this action",
        });
    }

    return next();
}

export default ensureContactOwnerOrAdmMiddleware