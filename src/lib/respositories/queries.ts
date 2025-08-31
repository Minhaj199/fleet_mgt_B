

export const incidentTable={
    select:{
        id:true,
        title:true,
        description:true,
        car:{
            select:{
                id:true,
                model:true,
                make:true
            }
        },
        assignedTo:{
            select:{
                id:true,
                name:true
            }
        },
        severity:true,
        status :true,
        type:true,
        location:true,
        occurredAt:true,
        resolvedAt:true
    }
    
}
