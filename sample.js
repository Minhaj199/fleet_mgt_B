const form={
  id: 17,
  carId: 1,
  reportedById: 2,
  assignedToId: null,
  title: 'edit testcase',
  description: 'car went missing',
  severity: 'HIGH',
  status: 'PENDING',
  type: 'THEFT',
  location: 'min',
  latitude: 54544,
  longitude: 4554,
  occurredAt: '2025-08-31T17:43',
  reportedAt: '2025-08-31T14:44:27.630Z',
  carReadingId: 14,
  images: [
    'https://res.cloudinary.com/dyomgcbln/image/upload/v1756651441/fleetmgt/knh5rrlq6wtwodzmpepv.jpg',
    'https://res.cloudinary.com/dyomgcbln/image/upload/v1756651445/fleetmgt/vfe0qkijdsczh49bzojo.jpg',
    'https://res.cloudinary.com/dyomgcbln/image/upload/v1756651448/fleetmgt/i3ut5ohjve4h9prjbgfd.jpg',
    'https://res.cloudinary.com/dyomgcbln/image/upload/v1756651451/fleetmgt/uel1gjxlrjzbbowctzlh.jpg'
  ],
  documents: [
    'https://res.cloudinary.com/dyomgcbln/raw/upload/v1756651431/fleetmgt/pigxnki5lixf67tetfs3.pdf'
  ],
  resolutionNotes: null,
  estimatedCost: 31232,
  actualCost: null,
  resolvedAt: null,
  createdAt: '2025-08-31T14:44:27.630Z',
  updatedAt: '2025-08-31T14:44:27.630Z',
  updates: [],
  car: { make: 'Toyota', model: 'Corolla' },
  assignedTo: 'undefined',
  incidentType: 'THEFT',
  carName: '1',
  reportedByName: '2',
  odometer: '',
  attachments: [],
  logMessage: '',
  from: 'MAIN_UPDATE'
}

const og={
  carId: 1,
  reportedById: 2,
  assignedToId: null,
  title: 'edit testcase',
  description: 'car went missing',
  severity: 'HIGH',
  status: 'PENDING',
  type: 'THEFT',
  location: 'min',
  latitude: 54544,
  longitude: 4554,
  occurredAt: '2025-08-31T17:43:00.000Z',
  reportedAt: '2025-08-31T14:44:27.630Z',
  carReadingId: 14,
  images: [
    'https://res.cloudinary.com/dyomgcbln/image/upload/v1756651441/fleetmgt/knh5rrlq6wtwodzmpepv.jpg',
    'https://res.cloudinary.com/dyomgcbln/image/upload/v1756651445/fleetmgt/vfe0qkijdsczh49bzojo.jpg',
    'https://res.cloudinary.com/dyomgcbln/image/upload/v1756651448/fleetmgt/i3ut5ohjve4h9prjbgfd.jpg',
    'https://res.cloudinary.com/dyomgcbln/image/upload/v1756651451/fleetmgt/uel1gjxlrjzbbowctzlh.jpg'
  ],
  documents: [
    'https://res.cloudinary.com/dyomgcbln/raw/upload/v1756651431/fleetmgt/pigxnki5lixf67tetfs3.pdf'
  ],
  resolutionNotes: null,
  estimatedCost: 31232,
  actualCost: null,
  resolvedAt: null,
  createdAt: '2025-08-31T14:44:27.630Z',
  updatedAt: '2025-08-31T14:44:27.630Z',
  updates: [
    {
      id: 83,
      incidentId: 17,
      userId: 1,
      message: 'what is current status',
      updateType: 'COMMENT',
      createdAt: '2025-08-31T14:44:45.305Z',
      user: [Object]
    }
  ],
  car: { make: 'Toyota', model: 'Corolla' },
  assignedTo: null
}

changeFinder(origin,form)