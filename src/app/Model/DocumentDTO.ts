export class DocumentDTO{
  constructor(
    public id:number,
    public title:string,
    public type:string,
    public notes:string,
    public dateOfUpdate:Date,
    public myclasses:{className:string,classId:number}
  ){

  }
}
