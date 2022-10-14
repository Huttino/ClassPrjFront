import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/WebSocket/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  input=""
  constructor(
    public messageSrv:MessageService
  ) {
   }
   ngOnInit(): void {

   }
   sendMessage(){
    console.log(this.input)
    if(this.input){
      this.messageSrv.sendMessage(this.input)
      this.input=''
    }
   }

   checkConnection(){
    console.log(this.messageSrv.stompClient.connected)
   }


}
