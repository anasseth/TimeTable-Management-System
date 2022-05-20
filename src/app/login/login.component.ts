import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  adminCredentials: any;
  email?: string;
  password?: string;
  newPassword?: string;
  isLogin: boolean = true;
  isChangePassword: boolean = false;
  userEmailData: any = [
    {
      email: "admin@org.com",
      password: "admin12345",
      userRole: "admin",
      access: "Full Access",
    },
    {
      email: "prof.tomhall@org.com",
      password: "tom12345",
      userRole: "teacher",
      access: "Edit Access",
    },
    {
      email: "student75909@org.com",
      password: "BatchYear2020",
      userRole: "student",
      access: "View Only",
    },
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {}

  activeChangePassword() {
    this.isChangePassword = true;
    this.isLogin = false;
  }

  login() {
    if (this.isLogin) {
      if (
        (this.email != undefined || this.email != null) &&
        (this.password != undefined || this.password != null)
      ) {
        var dataVar = this.userEmailData.filter(
          (x: any) => x.email == this.email
        );
        if (dataVar.length > 0) {
          if (dataVar[0].password == this.password) {
            localStorage.setItem("userData", JSON.stringify(dataVar[0]));
            this.router.navigate(["/timetable"]);
          } else {
            alert("Email or Password is Incorrect");
          }
        } else {
          alert("Email or Password is Incorrect");
        }
      } else {
        alert("Email or Password is Incorrect");
      }
    } else if (this.isChangePassword) {
      alert("Password Changing is Not Supported At This Time");
    }
  }
}
