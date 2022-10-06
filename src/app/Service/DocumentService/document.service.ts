import { Injectable } from '@angular/core';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { UploadDocumentWithData } from 'src/app/Model/UploadDocumentWithData';
import { DocumentRepository } from 'src/app/Repository/DocumentRepository';
import { LocalstorageService } from '../LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  constructor(
    private local:LocalstorageService,
    private documentRepo:DocumentRepository
  ) { }

  deleteDocument(Id: number) {
    return this.documentRepo.deleteDocument(Id,this.local.get(TOKEN)+"")
  }

  uploadDocument(files:UploadDocumentWithData,id:number){
    const data=new FormData()
    files.file.forEach(x=>{
      data.append("file[]",x as Blob)
    })
    data.append("notes",files.notes)
    console.log(data.getAll("notes"))
    return this.documentRepo.postDocuments(data,this.local.get(TOKEN)+"",id)
  }

  downloadDocument(id:number){
    return this.documentRepo.getDocument(id,this.local.get(TOKEN)+"")
  }
}
