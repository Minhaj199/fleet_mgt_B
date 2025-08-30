import { IncidentSeverity, IncidentType } from "@prisma/client"

export type IncidentInput={
  title: string,
  description: string,
  type: IncidentType,
  severity: IncidentSeverity,
  location: string,
  occurredAt: Date,
  latitude?: number,
  longitude?: number,
  odometer?: number,
  estimatedCost?: number,
  carId: number,
  reportedById: number,
  images?:string[]
  attachments?:string []
  documents?:string[]
}