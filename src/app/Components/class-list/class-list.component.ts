import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassRoomStripped } from 'src/app/Model/ClassRoom';
import { Scope } from 'src/app/Model/Scope';
import { ClassService } from 'src/app/Service/ClassService/class.service';
import { ScopeService } from 'src/app/Service/ScopeService/scope.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  public search: string = ""
  public filteredClasses: ClassRoomStripped[] = []
  public allClassRoom: ClassRoomStripped[] = []
  public selectedScopes: number[] = []
  public scopes: Scope[] = []
  constructor(
    private classSrv: ClassService,
    private scopeSrv: ScopeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.classSrv.GetAllClasses().subscribe(
      {
        next: (x) => {
          this.allClassRoom = x.sort((a, b) => {
            if (a.className.toLowerCase() > b.className.toLowerCase())
              return 1
            else if (a.className.toLowerCase() < b.className.toLowerCase())
              return -1
            else return 0
          })
        },
        error: (e) => {
          alert("error in loading all classes")
        },
        complete: () => {
          this.filteredClasses = this.allClassRoom
        }
      })
    this.scopeSrv.getAllScopes().forEach(
      x => this.scopes = x
    )
  }

  changeFilter() {
    this.filteredClasses = this.allClassRoom.filter(x => x.className.toLowerCase().includes(this.search.toLowerCase()) && this.selectedScopes.every(y => x.scopesId.includes(y)))
  }
  navigate(classid: number) {
    this.router.navigate([{
      outlets: {
        content: ['classRoomPresentation', classid]
      }
    }])
  }


  select(event: MouseEvent, scopeId: number) {
    if (this.selectedScopes.includes(scopeId)) {
      this.selectedScopes.splice(this.selectedScopes.indexOf(scopeId), 1);
      (event.target as HTMLButtonElement).classList.remove('selected')
      this.changeFilter()
    }
    else {
      this.selectedScopes.push(scopeId);
      (event.target as HTMLButtonElement).classList.add('selected')
      this.changeFilter()
    }
  }

}
