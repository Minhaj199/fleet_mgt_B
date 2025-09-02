import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/error";


export const errorHanlder=(err:Error,req:Request,res:Response,next:NextFunction)=>{

    if(err instanceof AppError){
        res.status(err.statusCode).json(err.toJSON())
    }else if(err instanceof Error){
        res.status(500).json({message:err.message||'internal server error'})
    }else{
        res.status(500).json({message:'internal server error'})
    }
    next()
}