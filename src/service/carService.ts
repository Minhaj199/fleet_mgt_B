import { PrismaClient } from "@prisma/client";
import { IncidentInput } from "../type/type";
const prisma = new PrismaClient();

export const insertData = async (data: IncidentInput) => {
  const incident = await prisma.$transaction(async (tx) => {
    const reading = await tx.carReading.create({
      data: {
        carId: data.carId,
        fuelLevel: 50,
        mileage: 100,
      },
    });

    const incident = await tx.incident.create({
      data: { ...data, carReadingId: reading ? reading.id : null },
    });

    return incident;
  });
  return incident;
};
