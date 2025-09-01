import z, { optional } from "zod"

export const DetailsSchema = z.object({
  title: z.string().trim().min(2, 'Title is required').max(30,'max limit is 30'),
  description: z.string().trim().min(2, 'Description is required').max(50,'max limit 50'),
  severity: z.enum(['LOW','MEDIUM','HIGH','CRITICAL'], { message:'Select severity' }),
  incidentType: z.enum(['ACCIDENT'
  ,'BREAKDOWN'
  ,'THEFT'
  ,'VANDALISM'
  ,"MAINTENANCE_ISSUE"
  ,"TRAFFIC_VIOLATION"
  ,"FUEL_ISSUE"
  ,"OTHER"],{ message:'Select type'})
})
export const LocationSchema = z.object({
  location: z.string().trim().min(1, 'Location required').max(20,'max limit reached'),
  latitude: z.preprocess(val => val === ''? undefined : Number(val), z.number().optional()),
  longitude: z.preprocess(val => val === ''? undefined : Number(val), z.number().optional()),
  occurredAt: z.string().min(1, 'Date & time required').refine(val=>{
    const date=new Date(val)
    return !isNaN(date.getTime())&&date<new Date()
  },{message:'Occurred date must be before the current date & time'}),
})
export const VehicleSchema = z.object({
  carName: z.string().min(1,'Car required'),
  reportedByName: z.string().min(1,'Reported by required'),
  images: z.array(z.url()).max(5).optional(),
  documents: z.array(z.url()).max(5).optional(),
  estimatedCost: z.preprocess(
  (v) => {
    if (v === '' || v === null || v === undefined) return undefined;
    const num = Number(v);
    return isNaN(num) ? undefined : num;
  },
  z.number().positive().optional()
),
}).refine(data=>{
  const imageL=data.images?.length||0
  const documentL=data.images?.length||0
  return imageL+documentL <=5
},{message:'total amount of attachment excieded',path:['attachments']},)

export const fullSchma=DetailsSchema.extend({...LocationSchema.shape,...VehicleSchema.shape})
