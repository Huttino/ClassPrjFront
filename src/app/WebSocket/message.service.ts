import { Injectable } from '@angular/core';
import { Client, StompConfig } from '@stomp/stompjs';
import { delay } from 'rxjs';
import * as SockJS from 'sockjs-client';

import { LocalstorageService } from '../Service/LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    public local:LocalstorageService
  ) {
    this.initializingWebSocketConnection()
   }
  public stompClient!: Client;
  public msg:string[]=[];
  /*initializingWebSocketConnection(){
    const serverUrl='http://localhost:8080/socket'
    const ws=new SockJS(serverUrl)
    console.log(ws)
    this.stompClient=this.stompClient.webSocketFactory(()=>{return ws})
    const that=this
    this.stompClient.connect({},function(){
      console.log(that.stompClient+"ci siamo?")
      that.stompClient.subscribe('/message',(message)=>{
        if(message.body){
          console.log(message.body)
          that.msg.push(message.body);
        }
      })
    })
  }*/

  initializingWebSocketConnection(){
    this.stompClient=new Client()
    this.stompClient.brokerURL="ws://localhost:8080/socket"
    this.stompClient.activate()
    delay(1000)
    console.log(this.stompClient.connected)
  }
  sendMessage(message:string){
    this.stompClient.publish({destination:'app/send/message',body:"hello,Stomp"})
  }
}
