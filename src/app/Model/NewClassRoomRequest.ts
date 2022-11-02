export class NewClassRoomRequest {
  public className: string
  public description: string
  public scopesId: number[]
  constructor() {
    this.className = ""
    this.description = ""
    this.scopesId = []
  }
}
