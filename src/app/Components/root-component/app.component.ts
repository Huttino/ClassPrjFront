import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WebSocketAPI } from 'src/app/WebSocket/WebSocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(
    public router:Router
    )
  {

  }

  title = 'ClassPrjFront';

}
