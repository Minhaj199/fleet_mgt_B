import { NextFunction, Request, Response } from "express";
import { Incident, IncidentSeverity, IncidentType, PrismaClient } from "@prisma/client";
import { IncedentUpdateField, IncidentInput, LogField } from "../type/type";
import { insertData } from "../service/createService";
import { incidentTable } from "../lib/respositories/queries";
import { inLineUpdate, reportModification } from "../service/updationService";
import { changeFinder } from "../utils/changeFinder";
const prisma = new PrismaClient();
export const controller = {
  fetchAllincidents: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.query.from && req.query.from === "get-incident") {
      const { id } = req.query;
      const data = await prisma.incident.findUnique({
        where: { id: Number(id) },
      include:{updates:{include:{user:{select:{id:true,name:true}}}},car:{select:{make:true,model:true}},assignedTo:{select:{name:true,id:true}}}});
   
      return res.json(data);
    } else {
      try {
        const {
          page = 1,
          limit = 4,
          query,
          cars,
          severity,
          accidentOptions,
          assignedTo,
          startDate,
          endDate,
        } = req.query;

        const where: any = {};

        if (query) {
          where.OR = [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ];
        }
        if (cars) where.carId = Number(cars);
        if (severity) where.severity = severity;
        if (accidentOptions) where.type = accidentOptions;
        if (assignedTo) where.assignedToId =Number(assignedTo);
        if (
          startDate &&
          endDate &&
          typeof startDate === "string" &&
          typeof endDate === "string"
        ) {
          where.occurredAt = {
            gte: new Date(startDate),
            lte: new Date(endDate),
          };
        }
        const data = await prisma.incident.findMany({
          select: incidentTable.select,
          where,
          orderBy: { createdAt: "desc" },
          skip: (Number(page) - 1) * Number(limit),
          take: Number(limit),
        });
        const totoalCount = await prisma.incident.count({ where });
        res.json({ data, totoalCount });
      } catch (error) {
    
      }
    }
  },
  fetchSeeds: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cars = await prisma.car.findMany();
      const users = await prisma.user.findMany();
      res.json({ cars, users });
    } catch {
      next(new Error("internal server error"));
    }
  },
  createIncident: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;

      const processedData: IncidentInput = {
        title: data.title,
        description: data.description,
        type: data.incidentType as IncidentType,
        severity: data.severity as IncidentSeverity,
        location: data.location,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        occurredAt: new Date(data.occurredAt),
        estimatedCost: parseFloat(data.estimatedCost),
        images: data?.images,
        documents: data?.documents,

    
        carId: parseInt(data.carName, 10), 
        reportedById: parseInt(data.reportedByName, 10),

    
      };
      const result = await insertData(processedData);

      res.status(201).json(result);
    } catch (error) {
   
      next(new Error("internal server error"));
    }
  },
   updateIncident: async (req: Request, res: Response, next: NextFunction) => {
    ///////////udpating messages//
    
    try {
      
 
      const result=await prisma.incidentUpdate.create({data:{incidentId:Number(req.params.id),userId:Number(req.body.by),message:req.body.message,updateType:req.body.incidentType}})
 
      res.json(result);
    } catch (error) {
      console.log(error)
      next(new Error("internal server error"));
    }
  },
  modifyIncident:async (req: Request, res: Response, next: NextFunction) =>{
    try {
   
       if(req.body.from==='MAIN_UPDATE'){
        
         const { id } = req.params;
    
         const data = await prisma.incident.findUnique({
        where: { id: Number(id) },
        
        include:{updates:{include:{user:{select:{id:true,name:true}}}},car:{select:{make:true,model:true}},assignedTo:{select:{name:true}}}});
        const {incidentUpdateLoge,changed,updatedFiedlsLogs}:{incidentUpdateLoge:Record<IncedentUpdateField,any>[],changed:Partial<Incident>,updatedFiedlsLogs:Record<LogField,any>[]}=changeFinder(data,req.body)
          const updatedData=reportModification(changed,id,incidentUpdateLoge,updatedFiedlsLogs)
         res.json(updatedData)
        }else{
          const { id } = req.params;
         
        const orginalValue=await prisma.incident.findUnique({where:{id:Number(id)},include:{assignedTo:true}})
        if(orginalValue){
          const result=await inLineUpdate({...req.body,id,user:'2'},orginalValue,)
          res.json(result)

        }else{
          throw new Error('document not found')
        }
       }
    } catch (error) {
      console.log(error)
    }
  }
};
