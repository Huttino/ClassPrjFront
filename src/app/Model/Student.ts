export class Student{
  constructor(
    public id:number,
    public username:string,
    public fistName:string,
    public lastName:string,
    public authorities:string[],
    public memberOf:{className:string,classId:number}[]
  ){
  }
}
