import { IncidentUpdateType } from "@prisma/client"
import { IncedentUpdateField, LogField } from "../type/type"


export function changeFinder(orginal:any,modified:any){

    if(!orginal)throw new Error('Incident not found')
        const specialFields=['images','documents','updates','incidentType','carName','occurredAt','reportedByName','car','assignedTo','carId','id','createdAt','reportedAt','updatedAt']
        const updatedFiedlsLogs:Record<LogField,any>[]=[]
        const incidentUpdateLoge:Record<IncedentUpdateField,any>[]=[]
        const modifiedBy=2
        const changed:Record<string,any>={}
       for(let key in orginal){
        
        if(!specialFields.includes(key)&&modified[key]!==undefined&&modified[key]!==null){
            if(typeof orginal[key]==='string'){
                if(modified[key]&&String(modified[key])!==orginal[key]){
                    changed[key]=String(modified[key])
                     updatedFiedlsLogs.push({userId:2,field:key,incidentId:orginal.id,newValue:String(modified[key]),oldValue:String(orginal[key])})
                     incidentUpdateLoge.push({updateType:updateTypeFinder(key),message:`${key} changed from ${orginal[key]} to ${modified[key]}`,incidentId:orginal.id,userId:modifiedBy})
                }
            }else if((typeof orginal[key]==='number')){
                if(modified[key]&&Number(modified[key])!==orginal[key]){
                    changed[key]=Number(modified[key])
                     updatedFiedlsLogs.push({userId:2,field:key,incidentId:orginal.id,newValue:String(modified[key]),oldValue:String(orginal[key])})
                     incidentUpdateLoge.push({updateType:updateTypeFinder(key),message:`${key} changed from ${orginal[key]} to ${modified[key]}`,incidentId:orginal.id,userId:modifiedBy})
                }
            }else{
                    changed[key]=Number(modified[key])
                     updatedFiedlsLogs.push({userId:2,field:key,incidentId:orginal.id,newValue:String(modified[key]),oldValue:String(orginal[key])})
                     incidentUpdateLoge.push({updateType:updateTypeFinder(key),message:`${key} changed from ${orginal[key]} to ${modified[key]}`,incidentId:orginal.id,userId:modifiedBy})
                
            }
            
        }
       }
       if(isDifferenceInArray(orginal.images,modified.images)){
        changed['images']=modified['images']
        updatedFiedlsLogs.push({userId:2,field:'images',incidentId:orginal.id,newValue:JSON.stringify(modified['images']),oldValue:JSON.stringify(orginal['images'])})
    incidentUpdateLoge.push({updateType:updateTypeFinder('images'),message:`images changed`,incidentId:orginal.id,userId:modifiedBy})
        
    }
        if(isDifferenceInArray(orginal.documents,modified.documents)){
        changed['documents']=modified['documents']
        updatedFiedlsLogs.push({userId:2,field:'documents',incidentId:orginal.id,newValue:String(modified['documents']),oldValue:String(orginal['documents'])})
        incidentUpdateLoge.push({updateType:updateTypeFinder('documents'),message:`documents changed`,incidentId:orginal.id,userId:modifiedBy})

        
       }
       if(modified['carName']&&Number(modified['carName'])!==orginal['carId']){
        changed['car']={
            connect:{id:Number(modified['carName'])}
        }
        updatedFiedlsLogs.push({userId:2,field:'car',incidentId:orginal.id,newValue:'id '+modified['carName'],oldValue:'id '+orginal['carId']})
        incidentUpdateLoge.push({updateType:updateTypeFinder('carId'),message:`carId changed from ${orginal['carId']} to ${modified['carName']}`,incidentId:orginal.id,userId:modifiedBy})
        
    }
       if(modified.assignedTo&&orginal.assignedToId!==Number(modified.assignedTo)){
         changed['assignedTo']={
       

            connect:{id:Number(modified['assignedTo'])}
        }
         updatedFiedlsLogs.push({userId:2,field:'assignedTo',incidentId:orginal.id,newValue:'id '+modified['assignedTo'],oldValue:'id '+orginal['assignedToId']})
        incidentUpdateLoge.push({updateType:updateTypeFinder('assignedTo'),message:`assignedTo changed from ${orginal['assignedToId']} to ${modified['assignedTo']}`,incidentId:orginal.id,userId:modifiedBy})
        
       }
       if(modified.occurredAt&&new Date(modified.occurredAt).getTime()!==new Date(orginal.occurredAt).getTime()){
       
      changed['occurredAt']=new Date(modified['occurredAt'])
         updatedFiedlsLogs.push({userId:2,field:'occurredAt',incidentId:orginal.id,newValue:String(modified['occurredAt']),oldValue:String(orginal['occurredAt'])})
        incidentUpdateLoge.push({updateType:updateTypeFinder('occurredAt'),message:`occurredAt changed from ${new Date(orginal['occurredAt']).toLocaleDateString()} to ${new Date(modified['occurredAt']).toLocaleDateString()}`,incidentId:orginal.id,userId:modifiedBy})

        
       }
       if(modified.incidentType&&modified.incidentType!==orginal.type){
         changed['type']=modified['incidentType']
         updatedFiedlsLogs.push({userId:2,field:'type',incidentId:orginal.id,newValue:String(modified['incidentType']),oldValue:String(orginal['type'])})
        incidentUpdateLoge.push({updateType:updateTypeFinder('type'),message:`type changed from ${orginal['type']} to ${modified['incidentType']}`,incidentId:orginal.id,userId:modifiedBy})

       }
       if(modified.reportedByName&&Number(modified.reportedByName)!==orginal.reportedById){
        changed['reportedBy']={
            connect:{id:Number(modified['reportedByName'])}
        }
         updatedFiedlsLogs.push({userId:2,field:'reportedBy',incidentId:orginal.id,newValue:'id '+modified['reportedByName'],oldValue:'id '+orginal['reportedById']})
        incidentUpdateLoge.push({updateType:updateTypeFinder('reportedBy'),message:`reportedBy changed from ${orginal['reportedById']} to ${modified['reportedByName']}`,incidentId:orginal.id,userId:modifiedBy})
        
       }
       console.log(incidentUpdateLoge)
       if(!Object.keys(changed).length)throw new Error('no updation found')
       return {changed,incidentUpdateLoge,updatedFiedlsLogs}
}


  function isDifferenceInArray(orginal:string[]=[],form:string[]=[]){
    if(orginal.length!==form.length){
        return true
    }
    const sortOg=[...orginal].sort()
    const formSorted=[...form].sort()
    let flag=false
    for(let i =0;i<sortOg.length;i++){
        if(sortOg[i]!==formSorted[i]){
            flag=true
        }
    }
    return flag
  }
  function updateTypeFinder(key:string):IncidentUpdateType{
   const statusChange = ['status'];

const assignment = ['assignedTo'];

const costUpdate = ['estimatedCost', 'actualCost'];

const resolution = ['resolutionNotes', 'resolvedAt'];


    if(assignment.includes(key.toLocaleLowerCase())){
       return "ASSIGNMENT" 
    }else if(costUpdate.includes(key.toLocaleLowerCase())){
        return "COST_UPDATE"
    }else if (resolution.includes(key.toLocaleLowerCase())){
        return "RESOLUTION"
    }else if(statusChange.includes(key.toLocaleLowerCase())){
        return "STATUS_CHANGE"
    }
    else{
        return "COMMENT"
    }
}