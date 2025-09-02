import { prisma } from "../app";
import { IncidentInput } from "../type/type";

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
    await tx.incidentUpdate.create({
      data: {
        incidentId: incident.id,
        userId: incident.reportedById,
        message: "Incident created",
        updateType: "COMMENT",
      },
    });
    await tx.incidentAuditLog.create({
      data: {
        incidentId: incident.id,
        userId: incident.reportedById,
        field: "incident",
        oldValue: null,
        newValue: "created incident",
      },
    });
    return incident;
  });
  return incident;
};
