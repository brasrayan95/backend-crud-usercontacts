import { Request, Response, NextFunction } from "express";

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!((req.user.isAdm) || (req.user.id===req.params.id))) {
    return res.status(403).json({
      message: "User has no permission to do this action",
    });
  }
  return next();
};

export default ensureIsAdmMiddleware;
