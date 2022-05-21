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

L10n.load({
  "en-US": {
    schedule: {
      addTitle: "Add Title",
      saveButton: "Add",
      cancelButton: "Close",
      deleteButton: "Remove",
      newEvent: "Create Time Table",
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
  ej: any;
  activeRole: string = "student"; // "student" || "teacher" || "admin"
  access:string="View Only";
  allowMultiRowSelection: boolean = false;
  allowResizing: boolean = false;
  allowMultiDrag: boolean = false;
  public showWeekend: boolean = false;
  public selectedDate: Date = new Date();
  public scheduleHours: WorkHoursModel = {
    highlight: true,
    start: "08:00",
    end: "20:00",
  };

  dummyData = [
    {
      Type: 1,
      Teacher: 1,
      "Room/Hall": 1,
      Course: 1,
      Group: 1,
      Subject:
        "Introduction To Financial Accounting (Exam) By Prof. Tom Hall of Group A",
      StartTime: "2022-05-20T03:30:00.000Z",
      EndTime: "2022-05-20T05:00:00.000Z",
      IsAllDay: false,
      StartTimezone: null,
      EndTimezone: null,
      Color: 1,
      RecurrenceRule: null,
      Id: 1,
      RecurrenceException: null,
      RecurrenceID: null,
    },
    {
      Type: 3,
      Teacher: 2,
      "Room/Hall": 2,
      Course: 1,
      Group: 2,
      Subject:
        "Introduction To Financial Accounting (Class) By Prof. John Den of Group B",
      StartTime: "2022-05-17T04:30:00.000Z",
      EndTime: "2022-05-17T06:00:00.000Z",
      IsAllDay: false,
      StartTimezone: null,
      EndTimezone: null,
      Color: 3,
      RecurrenceRule: null,
      Id: 2,
      RecurrenceException: null,
      RecurrenceID: null,
    },
    {
      Type: 2,
      Teacher: 1,
      "Room/Hall": 1,
      Course: 4,
      Group: 3,
      Subject:
        "Natural Language Processing (Test) By Prof. Tom Hall of Group C",
      StartTime: "2022-05-18T06:00:00.000Z",
      EndTime: "2022-05-18T07:30:00.000Z",
      IsAllDay: false,
      StartTimezone: null,
      EndTimezone: null,
      Color: 2,
      RecurrenceRule: null,
      Id: 3,
      RecurrenceException: null,
      RecurrenceID: null,
      Guid: "a9254294-ce4b-ad50-fa2d-b2a7990b939c",
    },
  ];

  constructor(public router: Router) {}

  ngOnInit() {
    var userData:any = JSON.parse(localStorage.getItem("userData"));
    if (userData == null || userData == undefined) {
      this.router.navigate(["/"]);
    } else {
      this.activeRole = userData.userRole
      this.access = userData.access;
      this.setUserAccess(this.activeRole);
      this.eventSettings.dataSource = this.dummyData;
    }
  }

  public resourceDataColor = [
    { name: "Red", id: 1, color: "#e42b4e" },
    { name: "Purple", id: 2, color: "#be29ec" },
    { name: "Yellow", id: 3, color: "#fcb529" },
    { name: "Blue", id: 4, color: "#20a7db" },
  ];

  public resourceDataSourceType = [
    { name: "Exam", id: 1, Color: "#d93858" },
    { name: "Test", id: 2, Color: "#fc6f9e" },
    { name: "Class", id: 3, Color: "#525bfa" },
    { name: "Lab", id: 4, Color: "#ada163" },
  ];

  public resourceDataSourceTeacher = [
    { name: "Prof. Tom Hall", id: 1 },
    { name: "Prof. John Den", id: 2 },
    { name: "Prof. Daniel J. Post", id: 3 },
    { name: "Prof. Walter M. Espinal", id: 4 },
    { name: "Assistant Prof. Don S. Croteau", id: 5 },
  ];

  public resourceDataSourceCourse = [
    { name: "Introduction To Financial Accounting", id: 1 },
    { name: "Probablity & Stats", id: 2 },
    { name: "GeoEconomics", id: 3 },
    { name: "Natural Language Processing", id: 4 },
    { name: "Networking Data Layer", id: 5 },
  ];

  public resourceDataClassGroup = [
    { name: "Group A", id: 1 },
    { name: "Group B", id: 2 },
    { name: "Group C", id: 3 },
    { name: "Group D", id: 4 },
    { name: "Group E", id: 5 },
  ];

  public resourceDataSourceRoom = [
    { name: "Room# 54", id: 1 },
    { name: "Room# 55", id: 2 },
    { name: "Room# 56", id: 3 },
    { name: "Room# 57", id: 4 },
    { name: "Room# 58", id: 5 },
    { name: "Auditorium Hall", id: 6 },
    { name: "Computational Lab# 1", id: 7 },
    { name: "Computational Lab# 2", id: 8 },
  ];

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
      return this.resourceDataSourceTeacher.filter(
        (x: any) => x.id == variable
      )[0].name;
    } else if (dataObject == "Group") {
      return this.resourceDataClassGroup.filter((x: any) => x.id == variable)[0]
        .name;
    } else if (dataObject == "Course") {
      return this.resourceDataSourceCourse.filter(
        (x: any) => x.id == variable
      )[0].name;
    } else if (dataObject == "Room") {
      return this.resourceDataSourceRoom.filter((x: any) => x.id == variable)[0]
        .name;
    } else if (dataObject == "Type") {
      return this.resourceDataSourceType.filter((x: any) => x.id == variable)[0]
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
            this.resourceDataSourceType,
            "name",
            "id",
            "Type",
            restrictDropdown
          );
          this.createCustomDropdown(
            args,
            this.resourceDataSourceTeacher,
            "name",
            "id",
            "Teacher",
            restrictDropdown
          );
          this.createCustomDropdown(
            args,
            this.resourceDataSourceRoom,
            "name",
            "id",
            "Room/Hall",
            false
          );
          this.createCustomDropdown(
            args,
            this.resourceDataSourceCourse,
            "name",
            "id",
            "Course",
            restrictDropdown
          );
          this.createCustomDropdown(
            args,
            this.resourceDataClassGroup,
            "name",
            "id",
            "Group",
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

  logOut(){
    localStorage.clear()
    this.router.navigate(["/"])
  }
}
