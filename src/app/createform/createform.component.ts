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
  public formData1: FormGroup;
  public formData2: FormGroup;
  public formData3: FormGroup;
  public formData4: FormGroup;
  public formData5: FormGroup;

  show: string = "teacher";

  ngOnInit() { }

  constructor(
    public dialogRef: MatDialogRef<CreateformComponent>,
    public globalService: GlobalService,
    private fb: FormBuilder) {


    this.formData1 = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      userRole: [''],
      access: [''],
    });

    this.formData2 = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      group: ['', Validators.required],
      userRole: [''],
      access: [''],
    });

    this.formData3 = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      desp: ['', Validators.required],

    });
    this.formData4 = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      room: ['', Validators.required],
      type: ['', Validators.required],
      desp: ['', Validators.required],

    });
    this.formData5 = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      desp: ['', Validators.required],

    });
  }

  onDelete(i) {
    if (this.show == "teacher") {
      this.globalService.resourceDataSourceTeacher.splice(i, 1);
    }
    else if (this.show == "student") {
      this.globalService.resourceStudentData.splice(i, 1);
    }
    else if (this.show == "course") {
      return this.globalService.resourceDataSourceCourse.splice(i, 1)
    }
    else if (this.show == "class") {
      return this.globalService.resourceDataSourceRoom.splice(i, 1)
    }
    else if (this.show == "group") {
      return this.globalService.resourceDataClassGroup.splice(i, 1)
    }
    this.globalService.isDataUpdated = true;
  }

  onSubmit() {
    if (this.show == "teacher") {
      this.formData1.controls.id.setValue(this.getRandomID())
      this.formData1.controls.userRole.setValue("teacher")
      this.formData1.controls.access.setValue("Modifier l'Accès")
      this.globalService.resourceDataSourceTeacher.push(this.formData1.value);
      this.formData1.reset();
    }
    else if (this.show == "student") {
      this.formData2.controls.id.setValue(this.getRandomID())
      this.formData2.controls.userRole.setValue("student")
      this.formData2.controls.access.setValue("Afficher Uniquement")
      this.globalService.resourceStudentData.push(this.formData2.value);
      this.formData2.reset();
    }
    else if (this.show == "course") {
      this.formData3.controls.id.setValue(this.getRandomID())
      this.globalService.resourceDataSourceCourse.push(this.formData3.value);
      this.formData3.reset();

    }
    else if (this.show == "class") {
      this.formData4.controls.id.setValue(this.getRandomID())
      this.globalService.resourceDataSourceRoom.push(this.formData4.value);
      this.formData4.reset();
    }
    else if (this.show == "group") {
      this.formData5.controls.id.setValue(this.getRandomID())
      this.globalService.resourceDataClassGroup.push(this.formData5.value);
      this.formData5.reset();
    }
    this.globalService.isDataUpdated = true;
  }

  getCurrentData() {
    if (this.show == "teacher") {
      return this.globalService.resourceDataSourceTeacher
    }
    else if (this.show == "student") {
      return this.globalService.resourceStudentData
    }
    else if (this.show == "course") {
      return this.globalService.resourceDataSourceCourse
    }
    else if (this.show == "class") {
      return this.globalService.resourceDataSourceRoom
    }
    else if (this.show == "group") {
      return this.globalService.resourceDataClassGroup
    }
  }

  gotoform(text) {
    this.show = text;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getRandomID() {
    return Math.floor(Math.random() * 999999) + 1;
  }
}
