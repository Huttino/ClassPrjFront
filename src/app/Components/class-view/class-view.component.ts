import { Component, Input, OnInit } from '@angular/core';
import { eventListeners } from '@popperjs/core';
import { PublicClassRoom } from 'src/app/Model/ClassRoom';
import { Scope } from 'src/app/Model/Scope';
import { ClassService } from 'src/app/Service/ClassService/class.service';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.css']
})
export class ClassViewComponent implements OnInit {

  @Input('id') classId!: number
  @Input('left') left!: boolean
  public classRoomTitle = ""
  public classRoomDescription = ""
  public scopes: Scope[] = []
  public classRoom!: PublicClassRoom
  public reader = new FileReader()
  constructor(
    private classSrv: ClassService
  ) { }

  ngOnInit(): void {
    if (!this.left) {
      document.getElementsByClassName('container').item(1)?.classList.add('right')
    }
    this.classSrv.getPublicClass(this.classId).subscribe(
      {
        next: (x: PublicClassRoom) => {
          this.classRoomTitle = x.title
          this.classRoomDescription = x.description
          this.scopes = x.scopes
          this.classRoom = x
        }, error: (e) => { console.log(e) }
        , complete: () => {
          this.classSrv.getClassCover(this.classId).subscribe(
            (y: Blob) => {
              this.reader.readAsDataURL(y)
              this.reader.addEventListener("loadend", (event) => {
                document.getElementById(this.classId + "")?.setAttribute('src', (this.reader.result) as string)
              })

            }
          )
        }
      }
    )
  }
}
