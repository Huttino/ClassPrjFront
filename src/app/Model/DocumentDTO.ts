export class DocumentDTO{
  constructor(
    public id:number,
    public title:string,
    public type:string,
    public dateOfUpdate:Date,
    public notes?:string
  ){

  }
}
