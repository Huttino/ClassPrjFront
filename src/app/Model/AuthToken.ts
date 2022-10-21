export class AuthToken{
  constructor(
    public accessToken:string,
    public type:string,
    public refreshToken:string
  ){}
}
