export class UserRegistrationRequest{

  constructor(
    public username:string,
    public password:string,
    public firstName:string,
    public lastName:string
  )
  {}
}
