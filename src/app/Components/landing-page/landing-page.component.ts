import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicClassRoom } from 'src/app/Model/ClassRoom';
import { PublicRepository } from 'src/app/Repository/PublicRepository';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements AfterViewChecked {
  public classesToShow: PublicClassRoom[] = []

  public observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  })

  constructor(
    public router: Router,
    public publicRepo: PublicRepository
  ) {
    this.publicRepo.getPopularClasses().subscribe(

      x => {
        this.classesToShow = x
      }
    )
  }


  ngAfterViewChecked(): void {
    const hiddenElements = document.querySelectorAll('.hidden')
    hiddenElements.forEach((el) => {
      this.observer.observe(el)
    })
  }



  navigateTo(path: string) {
    this.router.navigate([{
      outlets: {
        primary: [path],
        content: []
      }
    }])
  }
}
