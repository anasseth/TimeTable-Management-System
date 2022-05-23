import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalService } from "../service/global.service";

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
      access: "Accès total",
    },
    {
      name: "Prof. Tom Hall",
      email: "prof.tomhall@org.com",
      password: "tom12345",
      userRole: "teacher",
      access: "Modifier l'Accès",
    },
    {
      name: "John",
      email: "student75909@org.com",
      password: "BatchYear2020",
      userRole: "student",
      access: "Afficher Uniquement",
    },
  ];

  constructor(public router: Router, public globalService: GlobalService) { }

  ngOnInit(): void {
    this.userEmailData = [
      ...this.userEmailData,
      ...this.globalService.resourceDataSourceTeacher,
      ...this.globalService.resourceStudentData
    ]
  }

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
            alert("E-mail ou Mot de Passe Incorrect");
          }
        } else {
          alert("E-mail ou Mot de Passe Incorrect");
        }
      } else {
        alert("E-mail ou Mot de Passe Incorrect");
      }
    } else if (this.isChangePassword) {
      alert("Le changement de mot de passe n'est pas pris en charge pour le moment");
    }
  }
}
