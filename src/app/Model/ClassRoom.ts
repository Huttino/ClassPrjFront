import { DocumentDTO } from "./DocumentDTO";
import { StudentInClass } from "./StudentInClass";

export class ClassRoom{
  constructor(
    public id:number,
    public className:string,
    public creator:string,
    public uploadedDocuments?:DocumentDTO[],
    public members?:StudentInClass[]
  ){}
}
