import { Response } from "express";

export default class AppError extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const handleError = (err: AppError, res: Response) => {
  const { statusCode, message } = err;
  return res.status(err.statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
