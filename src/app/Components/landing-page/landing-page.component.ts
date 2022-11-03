import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicClassRoom } from 'src/app/Model/ClassRoom';
import { PublicRepository } from 'src/app/Repository/PublicRepository';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewChecked {
  public classesToShow: { ClassRoom: PublicClassRoom, Cover: string }[] = []

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
  ) { }


  /*ngAfterContentInit(): void {
    var i = 0
    this.classesToShow.forEach((classToShow) => {
      var section = document.createElement('section')
      if (i % 2 == 0) section.classList.add('left', 'hidden', 'classRoom')
      else section.classList.add('right', 'hidden', 'classRoom')
      var header = document.createElement('h2')
      header.innerText = classToShow.ClassRoom.title
      var paragraph = document.createElement('p')
      paragraph.innerHTML = classToShow.ClassRoom.description
      var image = document.createElement('img')
      var reader = new FileReader();
      reader.readAsDataURL(classToShow.Cover);
      reader.onloadend = function () {
        var base64data = reader.result;
        image.src = base64data?.toString() as string
      }
      section.appendChild(image)
      section.appendChild(header)
      section.appendChild(paragraph)
      section.
    })
  }*/


  ngAfterViewChecked(): void {
    const hiddenElements = document.querySelectorAll('.hidden')
    hiddenElements.forEach((el) => {
      this.observer.observe(el)
    })
  }

  ngOnInit(): void {
    this.publicRepo.getPopularClasses().subscribe(

      x => {
        x.forEach((classRoom) => {
          for (var i = 0; i < 3; i++) {
            this.publicRepo.getCover(classRoom.id).subscribe(
              async (x: Blob) => {
                var reader = new FileReader()
                reader.onloadend = async function () {
                  var base64data = reader.result
                }
                document.getElementsByClassName("classCoverSrc").item(i)?.setAttribute('src', reader.result as string)
              }
            )

          }

        })
      })
  }

  setClassRoomElement(classRoom: PublicClassRoom, data: string) {
    this.classesToShow.push({ ClassRoom: classRoom, Cover: data })
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
