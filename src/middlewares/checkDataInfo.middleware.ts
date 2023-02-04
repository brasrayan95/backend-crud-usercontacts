import { Request, Response, NextFunction } from "express";

const checkDataInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const checkChangesId = "id" in req.body;
  const checkChangesIsAdm = "isAdm" in req.body;
  const checkChangesIsActive = "isActive" in req.body;
  if (checkChangesId || checkChangesIsActive || checkChangesIsAdm) {
    return res.status(401).json({ message: "Some values can't be changed" });
  }

  return next();
};

export default checkDataInfo;
