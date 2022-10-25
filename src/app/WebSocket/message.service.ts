import { Injectable } from '@angular/core';
import { Client, IMessage, IStompSocket} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ClassInStudent } from '../Model/ClassInStudent';
import { ClassRoom } from '../Model/ClassRoom';
import { TOKEN } from '../Model/Constants/Constants';
import { ReturnedMessages } from '../Model/ReturnedMessage';
import { SentMessage } from '../Model/SentMessage';

import { LocalstorageService } from '../Service/LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    public local:LocalstorageService
  ) {
   }
  public brokerUrl="ws://localhost:8080/socket"
  public stompClient!: Client;
  public chats:Map<number,ReturnedMessages[]>=new Map<number,ReturnedMessages[]>

  initializingWebSocketConnection(classes:ClassRoom[]|ClassInStudent[]){
    this.stompClient=new Client()
    this.stompClient.brokerURL=this.brokerUrl
    this.stompClient.onConnect=   ()=>{
      classes.forEach(x=>{
        this.subscribe(x.id)
      })
     }
    this.stompClient.connectHeaders={'Authorization':`Bearer ${this.local.get(TOKEN)}`}
    this.stompClient.activate()
  }

  sendMessage(message:SentMessage){
    this.stompClient.publish({destination:'/app/send/message',body:JSON.stringify(message)})
  }

  subscribe(classId:number){
    this.chats.set(classId,[])
    this.stompClient.subscribe("/message.classes"+classId,(x)=>{
      console.log(x)
      if(x.body as unknown as SentMessage){
        console.log(x.body)
        this.chats.get(classId)?.push(JSON.parse(x.body)as ReturnedMessages)
      }
    },{'Authorization':this.local.get(TOKEN)+""})
  }
  deactivateConnection(){
    console.log("chatDeactivated")
    this.stompClient.deactivate()
  }
}
