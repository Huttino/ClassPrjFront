import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PublicClassRoom } from "../Model/PublicClassRoom";

@Injectable({ providedIn: "root" })
export class PublicRepository {
  url: string = "http://localhost:8080/api/public/"
  constructor(
    public http: HttpClient
  ) {

  }
  public getPublicClass(classId: number): Observable<PublicClassRoom> {
    return this.http.get<PublicClassRoom>(this.url + "class/" + classId)
  }

  public getCover(classId: number) {
    return this.http.get(this.url + "class/" + classId + "/cover", {
      responseType: 'blob'
    })
  }
}
