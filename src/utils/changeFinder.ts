import { IncidentUpdateType } from "@prisma/client";
import { IncedentUpdateField, LogField } from "../type/type";

export function changeFinder(orginal: any, modified: any) {
  if (!orginal) throw new Error("Incident not found");
  const specialFields = [
    "images",
    "documents",
    "updates",
    "incidentType",
    "carName",
    "occurredAt",
    "reportedByName",
    "car",
    "assignedTo",
    "carId",
    "id",
    "createdAt",
    "reportedAt",
    "updatedAt",
  ];
  const updatedFiedlsLogs: Record<LogField, any>[] = [];
  const incidentUpdateLoge: Record<IncedentUpdateField, any>[] = [];
  const modifiedBy = Number(modified.changedBy);
  const changed: Record<string, any> = {};

  if (!modified) {
    throw new Error("updated by is required");
  }

  for (let key in orginal) {
    if (
      !specialFields.includes(key) &&
      modified[key] !== undefined &&
      modified[key] !== null
    ) {
      if (typeof orginal[key] === "string") {
        if (modified[key] && String(modified[key]) !== orginal[key]) {
          changed[key] = String(modified[key]);
          updatedFiedlsLogs.push({
            userId: modifiedBy,
            field: key,
            incidentId: orginal.id,
            newValue: String(modified[key]),
            oldValue: String(orginal[key]),
          });
          incidentUpdateLoge.push({
            updateType: updateTypeFinder(key),
            message: `${key} changed from ${orginal[key]} to ${modified[key]}`,
            incidentId: orginal.id,
            userId: modifiedBy,
          });
        }
      } else if (typeof orginal[key] === "number") {
        if (modified[key] && Number(modified[key]) !== orginal[key]) {
          changed[key] = Number(modified[key]);
          updatedFiedlsLogs.push({
            userId: modifiedBy,
            field: key,
            incidentId: orginal.id,
            newValue: String(modified[key]),
            oldValue: String(orginal[key]),
          });
          incidentUpdateLoge.push({
            updateType: updateTypeFinder(key),
            message: `${key} changed from ${orginal[key]} to ${modified[key]}`,
            incidentId: orginal.id,
            userId: modifiedBy,
          });
        }
      } else {
        changed[key] = Number(modified[key]);
        updatedFiedlsLogs.push({
          userId: modifiedBy,
          field: key,
          incidentId: orginal.id,
          newValue: String(modified[key]),
          oldValue: String(orginal[key]),
        });
        incidentUpdateLoge.push({
          updateType: updateTypeFinder(key),
          message: `${key} changed from ${orginal[key]} to ${modified[key]}`,
          incidentId: orginal.id,
          userId: modifiedBy,
        });
      }
    }
  }
  if (isDifferenceInArray(orginal.images, modified.images)) {
    changed["images"] = modified["images"];
    updatedFiedlsLogs.push({
      userId: modifiedBy,
      field: "images",
      incidentId: orginal.id,
      newValue: JSON.stringify(modified["images"]),
      oldValue: JSON.stringify(orginal["images"]),
    });
    incidentUpdateLoge.push({
      updateType: updateTypeFinder("images"),
      message: `images changed`,
      incidentId: orginal.id,
      userId: modifiedBy,
    });
  }
  if (isDifferenceInArray(orginal.documents, modified.documents)) {
    changed["documents"] = modified["documents"];
    updatedFiedlsLogs.push({
      userId: modifiedBy,
      field: "documents",
      incidentId: orginal.id,
      newValue: String(modified["documents"]),
      oldValue: String(orginal["documents"]),
    });
    incidentUpdateLoge.push({
      updateType: updateTypeFinder("documents"),
      message: `documents changed`,
      incidentId: orginal.id,
      userId: modifiedBy,
    });
  }
  if (modified["carName"] && Number(modified["carName"]) !== orginal["carId"]) {
    changed["car"] = {
      connect: { id: Number(modified["carName"]) },
    };
    updatedFiedlsLogs.push({
      userId: modifiedBy,
      field: "car",
      incidentId: orginal.id,
      newValue: "id " + modified["carName"],
      oldValue: "id " + orginal["carId"],
    });
    incidentUpdateLoge.push({
      updateType: updateTypeFinder("carId"),
      message: `carId changed from ${orginal["carId"]} to ${modified["carName"]}`,
      incidentId: orginal.id,
      userId: modifiedBy,
    });
  }
  if (
    modified.assignedTo &&
    orginal.assignedToId !== Number(modified.assignedTo)
  ) {
    changed["assignedTo"] = {
      connect: { id: Number(modified["assignedTo"]) },
    };
    updatedFiedlsLogs.push({
      userId: modifiedBy,
      field: "assignedTo",
      incidentId: orginal.id,
      newValue: "id " + modified["assignedTo"],
      oldValue: "id " + orginal["assignedToId"],
    });
    incidentUpdateLoge.push({
      updateType: updateTypeFinder("assignedTo"),
      message: `assignedTo changed from ${orginal["assignedToId"]} to ${modified["assignedTo"]}`,
      incidentId: orginal.id,
      userId: modifiedBy,
    });
  }
  if (
    modified.occurredAt &&
    new Date(modified.occurredAt).getTime() !==
      new Date(orginal.occurredAt).getTime()
  ) {
    changed["occurredAt"] = new Date(modified["occurredAt"]);
    updatedFiedlsLogs.push({
      userId: modifiedBy,
      field: "occurredAt",
      incidentId: orginal.id,
      newValue: String(modified["occurredAt"]),
      oldValue: String(orginal["occurredAt"]),
    });
    incidentUpdateLoge.push({
      updateType: updateTypeFinder("occurredAt"),
      message: `occurredAt changed from ${new Date(
        orginal["occurredAt"]
      ).toLocaleDateString()} to ${new Date(
        modified["occurredAt"]
      ).toLocaleDateString()}`,
      incidentId: orginal.id,
      userId: modifiedBy,
    });
  }

  if (modified.incidentType && modified.incidentType !== orginal.type) {
    changed["type"] = modified["incidentType"];
    updatedFiedlsLogs.push({
      userId: modifiedBy,
      field: "type",
      incidentId: orginal.id,
      newValue: String(modified["incidentType"]),
      oldValue: String(orginal["type"]),
    });
    incidentUpdateLoge.push({
      updateType: updateTypeFinder("type"),
      message: `type changed from ${orginal["type"]} to ${modified["incidentType"]}`,
      incidentId: orginal.id,
      userId: modifiedBy,
    });
  }

  if (
    modified.reportedByName &&
    Number(modified.reportedByName) !== orginal.reportedById
  ) {
    changed["reportedBy"] = {
      connect: { id: Number(modified["reportedByName"]) },
    };
    updatedFiedlsLogs.push({
      userId: modifiedBy,
      field: "reportedBy",
      incidentId: orginal.id,
      newValue: "id " + modified["reportedByName"],
      oldValue: "id " + orginal["reportedById"],
    });
    incidentUpdateLoge.push({
      updateType: updateTypeFinder("reportedBy"),
      message: `reportedBy changed from ${orginal["reportedById"]} to ${modified["reportedByName"]}`,
      incidentId: orginal.id,
      userId: modifiedBy,
    });
  }
  if (
    modified.status === "RESOLVED" &&
    !orginal.resolvedAt &&
    modified.status &&
    orginal.status !== "RESOLVED"
  ) {
    if (!orginal.actualCost && !modified.actualCost) {
      throw new Error("actual cost not found");
    }
    if (!orginal.resolutionNotes && !modified.resolution_Note) {
      throw new Error("resolution Note not found");
    }

    changed["resolvedAt"] = new Date();
    updatedFiedlsLogs.push({
      userId: modifiedBy,
      field: "resolvedAt",
      incidentId: orginal.id,
      newValue: new Date().toLocaleDateString(),
      oldValue: orginal["resolvedAt"] || null,
    });
    incidentUpdateLoge.push({
      updateType: updateTypeFinder("resolvedAt"),
      message: `resolvedAt changed from ${
        orginal["resolvedAt"] || null
      } to ${new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      incidentId: orginal.id,
      userId: modifiedBy,
    });
    changed["resolutionNotes"] = modified.resolution_Note || "case clossed";
    updatedFiedlsLogs.push({
      userId: modifiedBy,
      field: "resolutionNotes",
      incidentId: orginal.id,
      newValue: String(modified["resolution_Note"]),
      oldValue: String(orginal["resolutionNotes"]),
    });
    incidentUpdateLoge.push({
      updateType: updateTypeFinder("resolutionNotes"),
      message: `resolution note changed from ${orginal["resolutionNotes"]} to ${
        modified["resolution_Note"] || "case clossed"
      }`,
      incidentId: orginal.id,
      userId: modifiedBy,
    });
  }

  if (!Object.keys(changed).length) throw new Error("no updation found");

  if (!modified.changedBy) throw new Error("changed by not found");

  return { changed, incidentUpdateLoge, updatedFiedlsLogs };
}

function isDifferenceInArray(orginal: string[] = [], form: string[] = []) {
  if (orginal.length !== form.length) {
    return true;
  }
  const sortOg = [...orginal].sort();
  const formSorted = [...form].sort();
  let flag = false;
  for (let i = 0; i < sortOg.length; i++) {
    if (sortOg[i] !== formSorted[i]) {
      flag = true;
    }
  }
  return flag;
}
function updateTypeFinder(key: string): IncidentUpdateType {
  const statusChange = ["status"];
  const assignment = ["assignedTo"];

  const costUpdate = ["estimatedCost", "actualCost"];

  const resolution = ["resolutionNotes", "resolvedAt"];

  if (assignment.includes(key.toLocaleLowerCase())) {
    return "ASSIGNMENT";
  } else if (costUpdate.includes(key.toLocaleLowerCase())) {
    return "COST_UPDATE";
  } else if (resolution.includes(key.toLocaleLowerCase())) {
    return "RESOLUTION";
  } else if (statusChange.includes(key.toLocaleLowerCase())) {
    return "STATUS_CHANGE";
  } else {
    return "COMMENT";
  }
}

export function changeFinderInline(orginal: any, modified: any) {
  if (orginal.status !== modified.status) {
    return true;
  } else if (
    !orginal.assignedTo ||
    (modified.assignedTo.id && orginal.assignedTo.id !== modified.assignedTo.id)
  ) {
    return true;
  }
  return false;
}
