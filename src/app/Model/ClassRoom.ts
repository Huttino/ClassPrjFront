import { DocumentDTO } from "./DocumentDTO";
import { StudentInClass } from "./StudentInClass";
import { VideoLesson } from "./VideoLesson";

export class ClassRoom{
  constructor(
    public id:number,
    public className:string,
    public creator:string,
    public uploadedDocuments?:DocumentDTO[],
    public lessons?:VideoLesson[],
    public members?:StudentInClass[],

  ){}
}
export class ClassRoomStripped{
  constructor(
    public id:number,
    public className:string,
    public creator:string,
    public numberOfDocuments:number,
    public numberOfMembers:number,
    public numberOfLessons:number,
    public graded:boolean
  ){

  }
}
