import { Component, Input, OnInit } from "@angular/core";
import {
  EventSettingsModel,
  TimeScaleModel,
  GroupModel,
  View,
  DragAndDropService,
  CallbackFunction,
  ScheduleComponent,
  DayService,
  WeekService,
  MonthService,
  AgendaService,
  ResizeService,
  PopupOpenEventArgs,
  WorkHoursModel,
  PopupCloseEventArgs,
} from "@syncfusion/ej2-angular-schedule";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { createElement } from "@syncfusion/ej2-base";
import { DateTimePicker } from "@syncfusion/ej2-angular-calendars";
import { text } from "@angular/core/src/render3";
import { L10n } from "@syncfusion/ej2-base";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CreateformComponent } from "../createform/createform.component";
import { GlobalService } from "../service/global.service";

L10n.load({
  "en-US": {
    schedule: {
      addTitle: "Ajouter Un Titre",
      saveButton: "Ajouter",
      cancelButton: "Proche",
      deleteButton: "Éliminer",
      newEvent: "Créer Un Horaire",
    },
  },
});

@Component({
  selector: "app-timetable",
  templateUrl: "./timetable.component.html",
  styleUrls: ["./timetable.component.css"],
  providers: [
    DayService,
    WeekService,
    MonthService,
    AgendaService,
    ResizeService,
    DragAndDropService,
  ],
})
export class TimetableComponent implements OnInit {
  [x: string]: any;
  ej: any;
  activeRole: string = "student"; // "student" || "teacher" || "admin"
  access: string = "View Only";
  allowMultiRowSelection: boolean = false;
  allowResizing: boolean = false;
  allowMultiDrag: boolean = false;
  userInfo: any;
  public showWeekend: boolean = false;
  public selectedDate: Date = new Date();
  public scheduleHours: WorkHoursModel = {
    highlight: true,
    start: "08:00",
    end: "20:00",
  };


  constructor(public router: Router, public dailog: MatDialog, public globalService: GlobalService) { }

  ngOnInit() {
    var userData: any = JSON.parse(localStorage.getItem("userData"));
    if (userData == null || userData == undefined) {
      this.router.navigate(["/"]);
    } else {
      this.userInfo = userData;
      this.activeRole = userData.userRole
      this.access = userData.access;
      this.setUserAccess(this.activeRole);
      this.eventSettings.dataSource = this.globalService.timeTableData;
    }
  }

  public eventSettings: EventSettingsModel = {
    dataSource: [],
    allowAdding: true,
    allowDeleting: true,
    allowEditing: true,
  };

  setUserAccess(activeRole?: any) {
    if (activeRole == "admin") {
      this.allowMultiRowSelection = true;
      this.allowResizing = true;
      this.allowMultiDrag = true;
      this.eventSettings.allowAdding = true;
      this.eventSettings.allowEditing = true;
      this.eventSettings.allowEditing = true;
    } else if (activeRole == "teacher") {
      this.allowMultiRowSelection = true;
      this.allowResizing = true;
      this.allowMultiDrag = true;
      this.eventSettings.allowAdding = false;
      this.eventSettings.allowDeleting = false;
      this.eventSettings.allowEditing = true;
    } else {
      this.allowMultiRowSelection = false;
      this.allowResizing = false;
      this.allowMultiDrag = false;
      this.eventSettings.allowAdding = false;
      this.eventSettings.allowDeleting = false;
      this.eventSettings.allowEditing = false;
    }
  }
  public onPopupClose(args: PopupCloseEventArgs): void {
    // alert("PopupClose triggered");
    console.log(args);
    console.log("DataSource : ", this.eventSettings.dataSource);
    args.data.Subject =
      this.getVariableName(args.data.Course, "Course") +
      " (" +
      this.getVariableName(args.data.Type, "Type") +
      ") By " +
      this.getVariableName(args.data.Teacher, "Teacher") +
      " of " +
      this.getVariableName(args.data.Group, "Group");
  }

  getVariableName(variable?: any, dataObject?: any) {
    if (dataObject == "Teacher") {
      return this.globalService.resourceDataSourceTeacher.filter(
        (x: any) => x.id == variable
      )[0].name;
    } else if (dataObject == "Group") {
      return this.globalService.resourceDataClassGroup.filter((x: any) => x.id == variable)[0]
        .name;
    } else if (dataObject == "Course") {
      return this.globalService.resourceDataSourceCourse.filter(
        (x: any) => x.id == variable
      )[0].name;
    } else if (dataObject == "Room") {
      return this.globalService.resourceDataSourceRoom.filter((x: any) => x.id == variable)[0]
        .name;
    } else if (dataObject == "Type") {
      return this.globalService.resourceDataSourceType.filter((x: any) => x.id == variable)[0]
        .name;
    } else {
      return null;
    }
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    console.log(
      "DataSource : ",
      JSON.stringify(this.eventSettings.dataSource, undefined, 3)
    );
    if (this.activeRole != "student") {
      if (args.type === "QuickInfo") {
        args.cancel = true;
      } else if (args.type === "Editor") {
        var restrictDropdown = this.activeRole == "teacher" ? true : false;
        if (!args.element.querySelector(".custom-field-row")) {
          this.createCustomDropdown(
            args,
            this.globalService.resourceDataSourceType,
            "name",
            "id",
            "Taper",
            restrictDropdown
          );
          this.createCustomDropdown(
            args,
            this.globalService.resourceDataSourceTeacher,
            "name",
            "id",
            "Professeur",
            restrictDropdown
          );
          this.createCustomDropdown(
            args,
            this.globalService.resourceDataSourceRoom,
            "name",
            "id",
            "Salle/Salle",
            false
          );
          this.createCustomDropdown(
            args,
            this.globalService.resourceDataSourceCourse,
            "name",
            "id",
            "Cours",
            restrictDropdown
          );
          this.createCustomDropdown(
            args,
            this.globalService.resourceDataClassGroup,
            "name",
            "id",
            "Grouper",
            false
          );
        }
      }
    } else {
      args.cancel = true;
    }
  }

  createCustomDropdown(
    args,
    dataSource,
    propName1,
    propName2,
    dropDownName,
    isPopupReadOnly
  ) {
    let row: HTMLElement = createElement("div", {
      className: "custom-field-row",
    });
    let formElement: HTMLElement =
      args.element.querySelector(".e-schedule-form");
    formElement.firstChild.insertBefore(
      row,
      args.element.querySelector(".e-title-location-row")
    );
    let container: HTMLElement = createElement("div", {
      className: "custom-field-container",
    });
    let inputEle: HTMLInputElement = createElement("input", {
      className: "e-field",
      attrs: { name: "EventType" },
    }) as HTMLInputElement;
    container.appendChild(inputEle);
    row.appendChild(container);
    let dropDownList: DropDownList = new DropDownList({
      readonly: isPopupReadOnly,
      dataSource: dataSource,
      fields: { text: propName1, value: propName2 },
      value: (<{ [key: string]: Object }>args.data).EventType as string,
      floatLabelType: "Always",
      placeholder: dropDownName,
    });
    dropDownList.appendTo(inputEle);
    inputEle.setAttribute("name", dropDownName);
  }

  logOut() {
    this.saveTimeTableDataInService();
    localStorage.clear()
    this.router.navigate(["/"])
  }

  openDialog(): void {
    const dialogRef = this.dailog.open(CreateformComponent, {
      width: "500px",
      height: "500px",
      data: {},
    });
  }

  saveTimeTableDataInService() {
    this.globalService.timeTableData = this.eventSettings.dataSource;
  }
}
