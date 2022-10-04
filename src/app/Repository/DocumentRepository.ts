import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DocumentDTO } from "../Model/DocumentDTO";
import { UploadDocumentWithData } from "../Model/UploadDocumentWithData";

@Injectable({providedIn:'root'})
export class DocumentRepository{
  url:string ="http://localhost:8080/api/document/"
  constructor(
    private http:HttpClient
  ){

  }

  getDocument(id:number,token:string){

    return this.http.get(this.url+id,{
      responseType:'blob'
      ,
      headers:{
        'Authorization':`Bearer ${token}`,
      }
    })
  }

  postDocuments(data:FormData,token:string,id:number):Observable<DocumentDTO[]>{
    return this.http.post<any>(this.url+id,data,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }
}
