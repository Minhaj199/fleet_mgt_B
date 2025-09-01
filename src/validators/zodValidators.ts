import { AppError } from "../error/error";
import { HttpStatus } from "../type/statusCodeC";
import {  zodFormatedError } from "./zodFormater";
import { fullSchma } from "./zodSchmas";



export function IncidentInputValidator(data:unknown){
    const parsed=fullSchma.safeParse(data)
    if(parsed.success){
        return parsed.data
    }else{
        throw new AppError('validation error',HttpStatus.BAD_REQUEST,'filedError',zodFormatedError(parsed.error))
    }

}