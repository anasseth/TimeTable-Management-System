import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-createform",
  templateUrl: "./createform.component.html",
  styleUrls: ["./createform.component.css"],
})
export class CreateformComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CreateformComponent>) {}

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
