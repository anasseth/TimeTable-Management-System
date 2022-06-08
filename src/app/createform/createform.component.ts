import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GlobalService } from "../service/global.service";
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { iif } from "rxjs";

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
  public formData6: FormGroup;
  isEdit: boolean = false;
  activeIndex: any = -1;
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
      parent_group_id: ['', Validators.required]
    });

    this.formData6 = this.fb.group({
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
    else if (this.show == "parent_group") {
      return this.globalService.resourceDataParentGroup.splice(i, 1)
    }
    this.globalService.isDataUpdated = true;
  }

  onSubmit() {
    if (this.show == "teacher") {
      if (this.isEdit == false) {
        this.formData1.controls.id.setValue(this.getRandomID())
        this.formData1.controls.userRole.setValue("teacher")
        this.formData1.controls.access.setValue("Modifier l'Accès")
        this.globalService.resourceDataSourceTeacher.push(this.formData1.value);
        this.formData1.reset();
      }
      else {
        console.log(this.formData1.value)
        this.globalService.resourceDataSourceTeacher[this.activeIndex] = this.formData1.value
        this.formData1.reset();
      }
    }
    else if (this.show == "student") {
      if (this.isEdit == false) {
        this.formData2.controls.id.setValue(this.getRandomID())
        this.formData2.controls.userRole.setValue("student")
        this.formData2.controls.access.setValue("Afficher Uniquement")
        this.globalService.resourceStudentData.push(this.formData2.value);
        this.formData2.reset();
      }
      else {
        console.log(this.formData2.value)
        this.globalService.resourceStudentData[this.activeIndex] = this.formData2.value;
        this.formData2.reset();
      }
    }
    else if (this.show == "course") {
      if (this.isEdit == false) {
        this.formData3.controls.id.setValue(this.getRandomID())
        this.globalService.resourceDataSourceCourse.push(this.formData3.value);
        this.formData3.reset();
      }
      else {
        console.log(this.formData3.value)
        this.globalService.resourceDataSourceCourse[this.activeIndex] = this.formData3.value;
        this.formData3.reset();
      }
    }
    else if (this.show == "class") {
      if (this.isEdit == false) {
        this.formData4.controls.id.setValue(this.getRandomID())
        this.globalService.resourceDataSourceRoom.push(this.formData4.value);
        this.formData4.reset();
      }
      else {
        console.log(this.formData4.value)
        this.globalService.resourceDataSourceRoom[this.activeIndex] = this.formData4.value;
        this.formData4.reset();
      }
    }
    else if (this.show == "group") {
      if (this.isEdit == false) {
        this.formData5.controls.id.setValue(this.getRandomID())
        this.globalService.resourceDataClassGroup.push(this.formData5.value);
        this.formData5.reset();
      }
      else {
        console.log(this.formData5.value)
        this.globalService.resourceDataClassGroup[this.activeIndex] = this.formData5.value;
        this.formData5.reset();
      }
    }
    else if (this.show == "parent_group") {
      if (this.isEdit == false) {
        this.formData5.controls.id.setValue(this.getRandomID())
        this.globalService.resourceDataParentGroup.push(this.formData6.value);
        this.formData6.reset();
      }
      else {
        console.log(this.formData6.value)
        this.globalService.resourceDataParentGroup[this.activeIndex] = this.formData6.value;
        this.formData6.reset();
      }
    }
    this.globalService.isDataUpdated = true;
    this.isEdit = false;
    this.activeIndex = -1;
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
    else if (this.show == "parent_group") {
      return this.globalService.resourceDataParentGroup
    }
  }

  OnEdit(id?: any, index?: any) {
    var editObject: any = {};
    if (this.show == "teacher") {
      editObject = this.globalService.resourceDataSourceTeacher.filter(
        x => x.id == id
      )[0];
      this.formData1.setValue({
        id: editObject.id,
        name: editObject.name,
        course: editObject.course,
        email: editObject.email,
        password: editObject.password,
        userRole: editObject.userRole,
        access: editObject.access,
      });
    }
    else if (this.show == "student") {
      editObject = this.globalService.resourceStudentData.filter(
        x => x.id == id
      )[0];
      this.formData2.setValue({
        id: editObject.id,
        name: editObject.name,
        course: editObject.course,
        email: editObject.email,
        password: editObject.password,
        group: editObject.group,
        userRole: editObject.userRole,
        access: editObject.access,
      });
    }
    else if (this.show == "course") {
      editObject = this.globalService.resourceDataSourceCourse.filter(
        x => x.id == id
      )[0];
      this.formData3.setValue({
        id: editObject.id,
        name: editObject.name,
        type: editObject.type,
        desp: editObject.desp,
      })
    }
    else if (this.show == "class") {
      editObject = this.globalService.resourceDataSourceRoom.filter(
        x => x.id == id
      )[0];
      this.formData4.setValue({
        id: editObject.id,
        name: editObject.name,
        room: editObject.room,
        type: editObject.type,
        desp: editObject.desp,
      })
    }
    else if (this.show == "group") {
      editObject = this.globalService.resourceDataClassGroup.filter(
        x => x.id == id
      )[0];
      this.formData5.setValue({
        id: editObject.id,
        name: editObject.name,
        desp: editObject.desp,
        parent_group_id: editObject.parent_group_id
      })
    }
    else if (this.show == "parent_group") {
      editObject = this.globalService.resourceDataParentGroup.filter(
        x => x.id == id
      )[0];
      this.formData6.setValue({
        id: editObject.id,
        name: editObject.name,
        desp: editObject.desp
      })
    }
    this.isEdit = true;
    this.activeIndex = index;
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
