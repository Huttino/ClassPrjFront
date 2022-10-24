import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassRoom, ClassRoomStripped } from 'src/app/Model/ClassRoom';
import { ClassService } from 'src/app/Service/ClassService/class.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  public search:string=""
  public filteredClasses:ClassRoomStripped[]=[]
  public allClassRoom:ClassRoomStripped[]=[]
  constructor(
    private classSrv:ClassService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.classSrv.GetAllClasses().subscribe(
      {next:(x)=>{
      this.allClassRoom=x.sort((a,b)=>{
        if(a.className.toLowerCase()>b.className.toLowerCase())
        return 1
        else if(a.className.toLowerCase()<b.className.toLowerCase())
        return -1
        else return 0
      })
    },
    error:(e)=>{
      alert("error in loading all classes")
    },
    complete:()=>{
      this.filteredClasses=this.allClassRoom
    }
  })
  }

  changeFilter(){
    this.filteredClasses=this.allClassRoom.filter(x=>x.className.toLowerCase().includes(this.search.toLowerCase()))
  }
  navigate(classid:number){
    this.router.navigate([{
      outlets:{
        content:['class',classid]
      }
    }])
  }

}
