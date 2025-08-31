import { IncidentStatus, IncidentUpdateType } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function inLineUpdate(data:{id:string,status:IncidentStatus,assignedTo:string,user:string}){
  const result=await prisma.$transaction(async (tx)=>{
    const updatePayload: any = {};
     const updates: any = [];
     if (data.status) {
      if(data.status==='RESOLVED'){
        updatePayload.status = data.status;
        updatePayload.resolvedAt = new Date();
        updatePayload.resolutionNotes='case resolved'
        updates.push({
          incidentId:Number(data.id),
          userId:Number(data.user),
          updateType:IncidentUpdateType.STATUS_CHANGE ,
          message: `Status changed to ${data.status}`,
         
        });
      }else{
        updatePayload.status = data.status;
        updates.push({
          incidentId:Number(data.id),
          userId:Number(data.user),
          updateType:IncidentUpdateType.STATUS_CHANGE ,
          message: `Status changed to ${data.status}`,
         
        });

      }
  }
    if (data.assignedTo&&Number(data.assignedTo)) {
       
    updatePayload.assignedToId = parseInt(data.assignedTo);
    updates.push({
      incidentId:Number(data.id),
      userId:Number(data.user),
      updateType:IncidentUpdateType.ASSIGNMENT,
      message: `Assigned to user ${data.assignedTo}`,
    });
  }
   if (!Object.keys(updatePayload).length) {
    throw new Error("No valid fields provided for update");
  }

    
        const updatedIncident = await tx.incident.update({
            where:{id:Number(data.id)},
            data:updatePayload
        })
    
        if(updates.length){
            await tx.incidentUpdate.createMany({data:updates})
        }
        
        return updatedIncident
    })
    return result
}