import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { ClassService } from 'src/app/Service/ClassService/class.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  public classid:number=0
  public class!:ClassRoom
  constructor(
    public route:ActivatedRoute,
    public ClassSrv:ClassService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.classid=+(params.get('cod')+'')
      this.ClassSrv.getClass(this.classid).subscribe(
        (x)=>{
          this.class=x
        }
      )
    })
  }

}
