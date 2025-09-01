import { Request } from "express";
import { prisma } from "../../app";

export const incidentTable = {
  select: {
    id: true,
    title: true,
    description: true,
    car: {
      select: {
        id: true,
        model: true,
        make: true,
      },
    },
    assignedTo: {
      select: {
        id: true,
        name: true,
      },
    },
    severity: true,
    status: true,
    type: true,
    location: true,
    occurredAt: true,
    resolvedAt: true,
  },
};

export async function fetchIncident(req: Request) {
  if (req.query.from === "get-incident") {
    const { id } = req.query;
    const data = await prisma.incident.findUnique({
      where: { id: Number(id) },
      include: {
        updates: { include: { user: { select: { id: true, name: true } } } },
        car: { select: { make: true, model: true } },
        assignedTo: { select: { name: true } },
      },
    });
    return data;
  } else {
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
    if (assignedTo) where.assignedToId = Number(assignedTo);
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
    return { data, totoalCount };
  }
}
