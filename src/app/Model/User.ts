import { ClassInStudent } from "./ClassInStudent";
import { ClassRoom } from "./ClassRoom";

export class User{
  constructor(
  public id:number,
  public username:string,
  public firstName:string,
  public lastName:string,
  public authorities:string[],
  public hasCreated?:ClassRoom[],
  public memberOf?:ClassInStudent[]
  ){

  }
}
