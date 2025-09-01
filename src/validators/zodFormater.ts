import { ZodError, ZodIssue } from "zod";



export function zodFormatedError(zodData: ZodError): Record<string, string> {
  const errorData: Record<string, string> = {};
  zodData.issues.forEach((issue) => {
    const field = issue.path.join(".") || 'general';
    errorData[field] = issue.message;
  });
  return errorData;
}

export function zodArrayFormater(zodErrors: ZodIssue[]) {
 
  const formatted: Record<string, string> = {};

  for (const err of zodErrors) {
    const path = err.path;

    if (Array.isArray(path) &&path.length === 2 &&typeof path[0] === "number" &&typeof path[1] === "string"
    ) {
      console.log('here')
      const index = path[0];
      console.log(index)
      if (!(index in formatted)) {
        formatted[index] = err.message;
      }
    }
    console.log(formatted)
    return formatted;
  }
}
