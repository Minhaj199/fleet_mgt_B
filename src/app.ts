import express, { NextFunction, Request, Response } from 'express'
import { router } from './router/router'
import dotenv from 'dotenv'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
dotenv.config()

const corsOptins={
  origin:[process.env.FRONTEND||''],
  methods:['GET','POST','PUT','DELETE','PATCH'],

}


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOptins))


app.use('/api',router)



app.use((err:Error,req:Request,response:Response,next:NextFunction)=>{
    console.log(err)
    next()
})
app.listen(process.env.PORT,()=>console.log('started'))