import { DocumentDTO } from "./DocumentDTO";
import { Scope } from "./Scope";
import { StudentInClass } from "./StudentInClass";
import { VideoLesson } from "./VideoLesson";

export class ClassRoom {
  constructor(
    public id: number,
    public className: string,
    public creator: string,
    public uploadedDocuments?: DocumentDTO[],
    public lessons?: VideoLesson[],
    public members?: StudentInClass[],
    public scopes?: Scope[]
  ) { }
}
export class ClassRoomStripped {
  constructor(
    public id: number,
    public className: string,
    public creator: string,
    public numberOfDocuments: number,
    public numberOfMembers: number,
    public numberOfLessons: number,
    public graded: boolean,
    public scopesId: number[]
  ) {

  }
}
export class PublicClassRoom {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public scopes: Scope[]
  ) { }
}
