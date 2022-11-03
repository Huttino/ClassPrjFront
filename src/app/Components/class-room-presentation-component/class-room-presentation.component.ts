import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PublicClassRoom } from 'src/app/Model/ClassRoom';
import { ClassService } from 'src/app/Service/ClassService/class.service';

@Component({
  selector: 'app-class-room-presentation',
  templateUrl: './class-room-presentation.component.html',
  styleUrls: ['./class-room-presentation.component.css']
})
export class ClassRoomPresentationComponent implements OnInit {
  public toShow: PublicClassRoom = new PublicClassRoom(0, "", "", [])
  constructor(
    private publicSrv: ClassService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (!params.has('cod')) console.log('no classId')
      this.publicSrv.getPublicClass(+(params.get('cod') + "")).subscribe(
        {
          next: (x) => {
            console.log(x)
            this.toShow = x
          },
          error: (e) => {
            console.log(e.message)
          }
        }
      )
    })

    this.publicSrv.getPublicClass
  }

}
