// Is file se hum Express ki Request interface ko poore project ke liye update kar rahe hain
declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
    };
  }
}