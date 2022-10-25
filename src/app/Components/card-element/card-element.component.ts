import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-element',
  templateUrl: './card-element.component.html',
  styleUrls: ['./card-element.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: 31, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 31, opacity: 1 }),
        animate('300ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class CardElementComponent implements OnInit {
  @Input() id:number=0
  @Input() title:string=''
  @Input() description:string=''
  @Input() date!:Date
  @Input() modify:boolean=false
  @Input() icon:string=''
  @Output() onAction=new EventEmitter<{fileId:number,fileTitle:string}>()
  @Output() onDelete=new EventEmitter<{fileId:number,fileTitle:string}>()
  constructor() { }

  ngOnInit(): void {
  }
  delete(){
    this.onDelete.emit({fileId:this.id,fileTitle:this.title})
  }
  action(){
    this.onAction.emit({fileId:this.id,fileTitle:this.title})
  }
}
