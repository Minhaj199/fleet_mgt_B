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
export type IncidentRow={
    id: number,
    carId: number,
    reportedById: 3,
    "assignedToId": null,
    "title": "min",
    "description": "645445",
    "severity": "MEDIUM",
    "status": "PENDING",
    "type": "ACCIDENT",
    "location": "fjldkajkfj",
    "latitude": 465,
    "longitude": 646,
    "occurredAt": "2025-08-30T13:36:00.000Z",
    "reportedAt": "2025-08-30T10:41:02.723Z",
    "carReadingId": null,
    "images": [],
    "documents": [
        "https://res.cloudinary.com/dyomgcbln/image/upload/v1756550180/fleetmgt/n9k4s4bqdfmndwpf63ey.jpg",
        "https://res.cloudinary.com/dyomgcbln/image/upload/v1756550191/fleetmgt/m5iufv1xj3awowyeuaui.pdf"
    ],
    "resolutionNotes": null,
    "estimatedCost": 240,
    "actualCost": null,
    "resolvedAt": null,
    "createdAt": "2025-08-30T10:41:02.723Z",
    "updatedAt": "2025-08-30T10:41:02.723Z"
}