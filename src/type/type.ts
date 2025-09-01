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

export type LogField='incidentId'|'userId'|'oldValue'|'newValue'|'field'
export type IncedentUpdateField='updateType'|'message'|'incidentId'|'userId'
