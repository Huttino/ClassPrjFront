import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  set(key:string,value:string){
    localStorage.setItem(key,value)
  }

  get(key:string){
    return localStorage.getItem(key)
  }

  remove(key:string){
    localStorage.removeItem(key)
  }

  setObject(key:string,obj:any){
    this.set(key,JSON.stringify(obj))
  }

  getObject(key:string):any{
    const objString=this.get(key) as string
    return JSON.parse(objString)
  }
}
