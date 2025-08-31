import { NextFunction, Request, Response } from "express";
import { IncidentSeverity, IncidentType, PrismaClient } from "@prisma/client";
import { IncidentInput } from "../type/type";
import { insertData } from "../service/carService";
import { incidentTable } from "../lib/respositories/queries";
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
      });
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

        const limitParsed = Number(limit);
        const skip = Number(page) - 1 * limitParsed;
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
        if (assignedTo) where.assignedTo = assignedTo;
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
        console.log(error);
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

        // relational fields
        carId: parseInt(data.carName, 10), // string -> int
        reportedById: parseInt(data.reportedByName, 10),

        // optional, if you have a CarReading table
        // carReadingId: data.odometer ? parseInt(data.odometer, 10) : undefined,
      };
      const result = await insertData(processedData);

      res.json(result);
    } catch (error) {
      console.log(error)
      next(new Error("internal server error"));
    }
  },
};
