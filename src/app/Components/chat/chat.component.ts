import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ClassInStudent } from 'src/app/Model/ClassInStudent';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { ReturnedMessages } from 'src/app/Model/ReturnedMessage';
import { SentMessage } from 'src/app/Model/SentMessage';
import { Student, Teacher, User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { MessageService } from 'src/app/WebSocket/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  user!: Student | Teacher
  possibleClasses: { id: number, className: string }[] = []
  input = ""
  selectedClassId: number = 0
  messages?: ReturnedMessages[]
  currentSubscription: any
  chats = new Map()
  constructor(
    public messageSrv: MessageService,
    public auth: AuthService
  ) {
    this.auth.loggedUser().pipe(take(1)).subscribe(
      x => {
        if (x.authority === "STUDENT")
          this.user = new Student(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Student).memberOf)
        else (this.user = new Teacher(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Teacher).hasCreated))
      }
    )
    if (this.user instanceof Teacher)
      this.user.hasCreated?.forEach(x => {
        this.possibleClasses.push({ id: x.id, className: x.className })
      })
    else if (this.user instanceof Student)
      this.user.memberOf?.forEach((x) => {
        this.possibleClasses.push({ id: x.id, className: x.className })
      })
  }

  ngOnInit(): void {
    this.messageSrv.initializingWebSocketConnection(this.possibleClasses)
  }

  ngOnDestroy(): void {
    this.messageSrv.deactivateConnection()
  }

  sendMessage() {
    console.log(this.input)
    if (this.input) {
      console.log(this.selectedClassId)
      this.messageSrv.sendMessage(new SentMessage(this.input, this.user.firstName, this.user.lastName, this.user.username, this.selectedClassId))
      this.input = ''
    }
  }

  checkConnection() {
    console.log(this.messageSrv.stompClient.connected)
  }

  messagesToShow(classId: number) {
    this.selectedClassId = classId
    this.messages = this.messageSrv.chats.get(classId)
  }

}
