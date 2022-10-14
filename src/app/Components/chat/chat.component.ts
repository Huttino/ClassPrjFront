import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from 'src/app/WebSocket/WebSocketAPI';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  webSocketAPI:WebSocketAPI

  constructor() {
    this.webSocketAPI=new WebSocketAPI()
   }


  ngOnInit() {
  }

  connect(){
    this.webSocketAPI._connect()
  }

  disconnect(){
    this.webSocketAPI._disconnect()
  }
}
