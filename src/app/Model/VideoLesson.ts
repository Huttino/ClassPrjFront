export class VideoLesson{
  constructor(
    public Id:number,
    public title:string,
    public description:string,
    public dateOfUpload:Date,
    public relatedDocuments:Document[],
    public youTubeUrl:string
  ){}
}
