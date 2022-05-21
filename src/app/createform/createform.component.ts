import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GlobalService } from "../service/global.service";
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: "app-createform",
  templateUrl: "./createform.component.html",
  styleUrls: ["./createform.component.css"],
})
export class CreateformComponent implements OnInit {
  public myForm1: FormGroup;
  public myForm2: FormGroup;
  public myForm3: FormGroup;
  public myForm4: FormGroup;
  public myForm5: FormGroup;

  show: string = "teacher";

  ngOnInit() { }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  constructor(public dialogRef: MatDialogRef<CreateformComponent>, public globalService: GlobalService, private fb: FormBuilder) {


    this.myForm1 = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });


    this.myForm2 = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      group: ['', Validators.required],
    });

    this.myForm3 = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      desp: ['', Validators.required],

    });
    this.myForm4 = this.fb.group({
      name: ['', Validators.required],
      room: ['', Validators.required],
      type: ['', Validators.required],
      desp: ['', Validators.required],

    });
    this.myForm5 = this.fb.group({
      name: ['', Validators.required],
      desp: ['', Validators.required],

    });
  }

  onDelete(i) {
    if (this.show == "teacher") {
      this.globalService.teacherData.splice(i, 1);
    }
    else if (this.show == "student") {
      this.globalService.studentData.splice(i, 1);
    }
    else if (this.show == "course") {
      return this.globalService.courseData.splice(i, 1)
    }
    else if (this.show == "class") {
      return this.globalService.classData.splice(i, 1)
    }
    else if (this.show == "group") {
      return this.globalService.groupData.splice(i, 1)
    }
  }

  onSubmit() {
    if (this.show == "teacher") {
      this.globalService.teacherData.push(this.myForm1.value);
      this.myForm1.reset();
    }
    else if (this.show == "student") {
      this.globalService.studentData.push(this.myForm2.value);
      this.myForm2.reset();
    }
    else if (this.show == "course") {
      this.globalService.courseData.push(this.myForm3.value);
      this.myForm3.reset();

    }
    else if (this.show == "class") {
      this.globalService.classData.push(this.myForm4.value);
      this.myForm4.reset();
    }
    else if (this.show == "group") {
      this.globalService.groupData.push(this.myForm5.value);
      this.myForm5.reset();
    }
  }

  getCurrentData() {
    if (this.show == "teacher") {
      return this.globalService.teacherData
    }
    else if (this.show == "student") {
      return this.globalService.studentData
    }
    else if (this.show == "course") {
      return this.globalService.courseData
    }
    else if (this.show == "class") {
      return this.globalService.classData
    }
    else if (this.show == "group") {
      return this.globalService.groupData
    }
  }

  gotoform(text) {
    this.show = text;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
