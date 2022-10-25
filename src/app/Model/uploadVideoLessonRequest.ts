export class uploadVideoLessonRequest{
  constructor(
    public youTubeUrl:string,
    public title:string,
    public description:string,
    public documentsAttached:number[]
  ){

  }
}
