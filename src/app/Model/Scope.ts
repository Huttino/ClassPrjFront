export class Scope {
  constructor(
    public id: number,
    public title: string,
    public description: string
  ) {

  }
}
export class ScopeFilter {
  constructor(
    public scopesId: number[]
  ) { }
}
