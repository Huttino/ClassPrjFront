import { User } from "./User";

export class Student extends User{
  constructor(
    public override id:number,
    public override username:string,
    public override firstName:string,
    public override lastName:string,
    public override authorities:string[],
    public memberOf:{className:string,classId:number}[]
  ){
    super(id,username,firstName,lastName,authorities);
  }
}
