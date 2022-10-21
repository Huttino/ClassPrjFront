import { ClassInStudent } from "./ClassInStudent";
import { ClassRoom } from "./ClassRoom";

export class User{
  constructor(
  id:number,
  username:string,
  firstName:string,
  lastName:string,
  authority:string,
  ){
  }
}

export class Student extends User{
  constructor(
    public id:number,
    public username:string,
    public firstName:string,
    public lastName:string,
    public authority:string,
    public memberOf:ClassInStudent[]
  ){
    super(id,username,firstName,lastName,authority)
    Object.setPrototypeOf(this,Student.prototype)
  }
}

export class Teacher extends User{
  constructor(
    public id:number,
    public username:string,
    public firstName:string,
    public lastName:string,
    public authority:string,
    public hasCreated:ClassRoom[]
  ){
    super(id,username,firstName,lastName,authority)
    Object.setPrototypeOf(this,Teacher.prototype)
  }
}
