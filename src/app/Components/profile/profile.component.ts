import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordUpdateRequest } from 'src/app/Model/PasswordUpdateRequest';
import { Student, Teacher, User } from 'src/app/Model/User';
import { UserUpdateRequest } from 'src/app/Model/UserUpdateRequest';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  public user!: Student | Teacher
  public teacher = false;
  public choice!: number
  public images = [
    ('../../../assets/506134.png'),
    ('../../../assets/2922506.png'),
    ('../../../assets/2995620.png'),
    ('../../../assets/3480535.png'),
    ('../../../assets/3480547.png'),
    ('../../../assets/4532513.png'),
    ('../../../assets/4696907.png'),
    ('../../../assets/4892710.png'),
    ('../../../assets/4892749.png')
  ]
  public newUsername: string = ""
  public newFirstName: string = ""
  public newLastName: string = ""
  public oldPassword: string = ""
  public newPassword: string = ""
  public confirmNewPassword = ""
  constructor(
    public auth: AuthService,
    public modalService: NgbModal,
    public userService: UserService,
    public router: Router
  ) {
    this.auth.loggedUser().subscribe(
      x => {
        if (x.authority === "STUDENT")
          this.user = new Student(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Student).memberOf)
        else (this.user = new Teacher(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Teacher).hasCreated))
      }
    ).unsubscribe()
    if (this.user instanceof Teacher) {
      this.teacher = true
    }

  }
  ngOnInit(): void {
    this.choice = Math.floor(Math.random() * 8)
    let image: any = document.getElementById("image")
    image.src = this.images[this.choice]
  }
  OpenUpdateProfile(content: any) {
    this.newUsername = this.user.username
    this.newFirstName = this.user.firstName
    this.newLastName = this.user.lastName
    this.modalService.open(content, { centered: true })
  }

  OpenUpdatePassword(passwordUpdate: any) {
    this.modalService.open(passwordUpdate, { centered: true })
  }

  updateUser() {
    this.userService.updateMe(new UserUpdateRequest(this.newUsername, this.newFirstName, this.newLastName)).subscribe({
      next: () => {
        alert("Update Completed")
        this.userService.getMe().subscribe(x => {
          this.auth.updateLocalUser(x)
          this.user = x
        })
        this.modalService.dismissAll()
      },
      error: (e) => {
        alert("error in uploading the user")
      }
    })
  }

  updatePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      alert("new password don't match")
    }
    else {
      this.userService.updatePassword(new PasswordUpdateRequest(this.oldPassword, this.newPassword, this.confirmNewPassword))
        .subscribe({
          next: () => {
            alert("Update Completed,Pleas Sign in with the new Credentials")
            this.router.navigate([
              {
                outlets: {
                  primary: ['login'],
                  content: []
                }
              }
            ])
            this.modalService.dismissAll()
          },
          error: (e) => {
            if (e.status == 400)
              alert("wrong old password")
            else alert("wrong in the service")
          }
        })
    }
  }
}
