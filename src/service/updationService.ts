import { Incident, IncidentStatus, IncidentUpdateType } from "@prisma/client";
import { prisma } from "../app";
import { IncedentUpdateField, LogField } from "../type/type";

export async function inLineUpdate(data:{id:string,status:IncidentStatus,assignedTo:{id:string},user:string},incident:any){
  const result=await prisma.$transaction(async (tx)=>{
    const updatePayload: Record<string,any> = {};
    const changeLog:Record<LogField,any>[]=[]
     const updates: any = [];
     if (data.status&&data.status!==incident.status) {
      if(data.status==='RESOLVED'){
        changeLog.push({incidentId:incident.id,userId:Number(data.user),field:'status',oldValue:incident.status,newValue:'RESOLVED'})
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
        changeLog.push({incidentId:incident.id,userId:Number(data.user),field:'status',oldValue:incident.status,newValue:data.status})
        updates.push({
          incidentId:Number(data.id),
          userId:Number(data.user),
          updateType:IncidentUpdateType.STATUS_CHANGE ,
          message: `Status changed to ${data.status}`,
         
        });

      }
  }
    if (
  data.assignedTo?.id!=='' &&
  Number(data.assignedTo.id) &&
  (!incident.assignedTo || Number(data.assignedTo.id) !== incident.assignedTo?.id)
) {

    changeLog.push({incidentId:incident.id,userId:Number(data.user),field:'assignedTo',oldValue:(incident.assignedTo&&incident.assignedTo.id)? 'id '+incident.assignedTo.id: 'initial',newValue:'id '+data.assignedTo})    
    updatePayload.assignedToId = parseInt(data.assignedTo.id);
    updates.push({
      incidentId:Number(data.id),
      userId:Number(data.user),
      updateType:IncidentUpdateType.ASSIGNMENT,
      message: `Assigned to user ${data.assignedTo.id}`,
    });
  }
   if (!Object.keys(updatePayload).length) {
    throw new Error("No valid fields provided for update");
  }
  
const updatedIncident = await tx.incident.update({
            where:{id:Number(data.id)},
            data:updatePayload
        })
        await tx.incidentAuditLog.createMany({data:changeLog})
        if(updates.length){
            await tx.incidentUpdate.createMany({data:updates})
        }
        
        return updatedIncident
    })
    return result
}

export async function reportModification(data:Partial<Incident>,id:string,incidetUpdate:Record<IncedentUpdateField,any>[],updatedFiedlsLogs:Record<LogField,any>[]){
  const result=await prisma.$transaction(async(tx)=>{
   const result= await tx.incident.update({where:{id:Number(id)},data})
    await tx.incidentUpdate.createMany({data:incidetUpdate})
    await tx.incidentAuditLog.createMany({data:updatedFiedlsLogs})
    return result
  })
  return result
}