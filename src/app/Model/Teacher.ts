export class Teacher {
  constructor(
    public id:number,
    public username:string,
    public fistName:string,
    public lastName:string,
    public authorities:string[],
    public hasCreated:{className:string,classId:number}[]
  ){
  }
}
