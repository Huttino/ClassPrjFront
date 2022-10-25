import { DocumentDTO } from "./DocumentDTO";

export class VideoLesson{
  constructor(
    public id:number,
    public title:string,
    public description:string,
    public dateOfUpload:Date,
    public relatedDocuments:DocumentDTO[],
    public youTubeUrl:string
  ){}
}
