import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GlobalService } from "../service/global.service";

@Component({
  selector: "app-createform",
  templateUrl: "./createform.component.html",
  styleUrls: ["./createform.component.css"],
})
export class CreateformComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CreateformComponent>, public globalService: GlobalService) { }

  show: string = "teacher";

  ngOnInit() { }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  gotoform(text) {
    this.show = text;

  }

  getCurrentData() {
    if (this.show == "teacher") {
      return this.globalService.teacherData
    }
    else if (this.show == "student") {
      // return this.globalService.studentData
    }
  }
}
