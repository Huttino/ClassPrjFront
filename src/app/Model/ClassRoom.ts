import { DocumentDTO } from "./DocumentDTO";

export class ClassRoom{
  constructor(
    public id:number,
    public className:string,
    public creator:string,
    public uploadedDocuments:DocumentDTO[],
    public members:{username:string,id:number}[]
  ){}
}
