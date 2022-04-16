import { NextFunction, Request, Response } from "express";

export function handleErrorMiddleware(error, req: Request, res: Response, next: NextFunction){
  if(error.type === 'Conflict'){
    return res.status(409).send(error.message)
  }
}