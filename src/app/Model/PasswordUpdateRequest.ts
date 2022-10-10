export class PasswordUpdateRequest{
  constructor(
    public oldPassword:string,
    public newPassword:string,
    public confirmNewPassword:string
  ){

  }
}
