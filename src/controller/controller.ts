import { NextFunction, Request, Response } from "express";
import { IncidentSeverity, IncidentType, PrismaClient } from "@prisma/client";
import { IncidentInput } from "../type/type";
import { insertData } from "../service/carService";
const prisma = new PrismaClient();
export const controller = {
  fetchAllincidents: (req: Request, res: Response, next: NextFunction) => {
    try {
   
      
    } catch (error) {
      
    }
  },
  fetchSeeds: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cars = await prisma.car.findMany();
      const users = await prisma.user.findMany();
      res.json({ cars, users });
    } catch  {
      next(new Error('internal server error'))
    }
  },
  createIncident: async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const {data}=req.body
  
      const processedData:IncidentInput = {
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

  // relational fields
  carId: parseInt(data.carName, 10),           // string -> int
  reportedById: parseInt(data.reportedByName, 10),
  
  // optional, if you have a CarReading table
  // carReadingId: data.odometer ? parseInt(data.odometer, 10) : undefined,
};
 const result= await insertData(processedData)

      res.json('sucess');
    } catch  (error){
   
      next(new Error('internal server error'))
    }
  },


};
async function createIncident() {
  const incident = await prisma.incident.create({
    data: {
      title: "Engine Failure",
      description: "Car broke down on highway",
      type: "BREAKDOWN",
      severity: "HIGH",
      occurredAt: new Date(),
      reportedById: 1, // must exist in User table
      carId: 1, // must exist in Car table
    },
  });

}
///////incidenttype---type

const data={
  title: 'dfdkfljla',
  description: 'fkdllfkjaf',
  incidentType: 'BREAKDOWN',
  severity: 'HIGH',
  location: 'fdfaf',
  occurredAt: '2025-08-30T15:59',
  latitude: '545',
  longitude: '664',
  odometer: '6546465',
  estimatedCost: '15456',
  carName: '2',
  reportedByName: '2',
  attachments: [
    'https://res.cloudinary.com/dyomgcbln/image/upload/v1756538976/fleetmgt/czvk3xdn2c6hwxbstjss.png'
  ]
}

