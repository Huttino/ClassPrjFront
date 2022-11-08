import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassRoom, ClassRoomStripped } from 'src/app/Model/ClassRoom';
import { Scope } from 'src/app/Model/Scope';
import { ClassService } from 'src/app/Service/ClassService/class.service';
import { ScopeService } from 'src/app/Service/ScopeService/scope.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent {

  public search: string = ""
  public filteredClasses: ClassRoomStripped[] = []
  public allClassRoom$: Observable<ClassRoomStripped[]>
  public selectedScopes: number[] = []
  public scopes$
  constructor(
    private classSrv: ClassService,
    private scopeSrv: ScopeService,
    private router: Router
  ) {
    this.allClassRoom$ = this.classSrv.GetAllClasses()
    this.scopes$ = this.scopeSrv.getAllScopes()
  }

  navigate(classid: number) {
    this.router.navigate([{
      outlets: {
        content: ['classRoomPresentation', classid]
      }
    }])
  }

  classShowFilter(scopesId: number[], className: string): any {
    return (
      this.selectedScopes.every(x => scopesId.includes(x))
      &&
      className.toLowerCase().includes(this.search.toLowerCase())
    )
  }


  select(event: MouseEvent, scopeId: number) {
    if (this.selectedScopes.includes(scopeId)) {
      this.selectedScopes.splice(this.selectedScopes.indexOf(scopeId), 1);
      (event.target as HTMLButtonElement).classList.remove('selected')
    }
    else {
      this.selectedScopes.push(scopeId);
      (event.target as HTMLButtonElement).classList.add('selected')
    }
  }

}
