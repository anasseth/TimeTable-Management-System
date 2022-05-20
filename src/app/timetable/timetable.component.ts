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
} from "@syncfusion/ej2-angular-schedule";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { createElement } from "@syncfusion/ej2-base";
import { DateTimePicker } from "@syncfusion/ej2-angular-calendars";
import { text } from "@angular/core/src/render3";
import { L10n } from "@syncfusion/ej2-base";
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
  public showWeekend: boolean = false;
  public selectedDate: Date = new Date();
  public scheduleHours: WorkHoursModel  = { highlight: true, start: '08:00', end: '20:00' };

  constructor() { }

  ngOnInit() { }


//   public eventSettings: EventSettingsModel = {
//     dataSource: [
//     {
//         Id: 1,
//         Subject: 'Explosion of Betelgeuse Star',
//         StartTime: new Date(2018, 1, 15, 9, 30),
//         EndTime: new Date(2018, 1, 15, 11, 0)
//     }, {
//         Id: 2,
//         Subject: 'Thule Air Crash Report',
//         StartTime: new Date(2018, 1, 12, 12, 0),
//         EndTime: new Date(2018, 1, 12, 14, 0)
//     }, {
//         Id: 3,
//         Subject: 'Blue Moon Eclipse',
//         StartTime: new Date(2018, 1, 13, 9, 30),
//         EndTime: new Date(2018, 1, 13, 11, 0)
//     }, {
//         Id: 4,
//         Subject: 'Meteor Showers in 2018',
//         StartTime: new Date(2018, 1, 14, 13, 0),
//         EndTime: new Date(2018, 1, 14, 14, 30)
//     }]
// };

  public resourceDataSourceType: Object[] = [
    { name: "Exam", id: 1, Color: "#d93858" },
    { name: "Test", id: 2, Color: "#fc6f9e" },
    { name: "Class", id: 3, Color: "#525bfa" },
    { name: "Lab", id: 4, Color: "#ada163" },
  ];

  public resourceDataSourceTeacher: Object[] = [
    { name: "Prof. Tom Hall", id: 1 },
    { name: "Prof. John Den", id: 2 },
    { name: "Prof. Daniel J. Post", id: 3 },
    { name: "Prof. Walter M. Espinal", id: 4 },
    { name: "Assistant Prof. Don S. Croteau", id: 5 },
  ];

  public resourceDataSourceCourse: Object[] = [
    { name: "Introduction To Financial Accounting", id: 1 },
    { name: "Probablity & Stats", id: 2 },
    { name: "GeoEconomics", id: 3 },
    { name: "Natural Language Processing", id: 4 },
    { name: "Networking Data Layer", id: 5 },
  ];

  public resourceDataClassGroup: Object[] = [
    { name: "Group A", id: 1 },
    { name: "Group B", id: 2 },
    { name: "Group C", id: 3 },
    { name: "Group D", id: 4 },
    { name: "Group E", id: 5 },
  ];

  public resourceDataSourceRoom: Object[] = [
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
    allowAdding:true,
    allowDeleting:true,
    allowEditing:true,
  };

  onPopupOpen(args: PopupOpenEventArgs): void {
    console.log("DataSource : ",this.eventSettings.dataSource)
    if (args.type === 'QuickInfo')  {
      args.cancel = true;
    }
    else if (args.type === "Editor") {
      if (!args.element.querySelector('.custom-field-row')) {
        this.createCustomDropdown(args, this.resourceDataSourceType, "name", "id", "Type",false)
        this.createCustomDropdown(args, this.resourceDataSourceTeacher, "name", "id", "Teacher",false)
        this.createCustomDropdown(args, this.resourceDataSourceRoom, "name", "id", "Room/Hall",false)
        this.createCustomDropdown(args, this.resourceDataSourceCourse, "name", "id", "Course",false)
        this.createCustomDropdown(args, this.resourceDataClassGroup, "name", "id", "Group",false)
      }
    }
  }

  createCustomDropdown(args, dataSource, propName1, propName2, dropDownName,isPopupReadOnly) {
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
      readonly:isPopupReadOnly,
      dataSource: dataSource,
      fields: { text: propName1, value: propName2, },
      value: (<{ [key: string]: Object }>args.data).EventType as string,
      floatLabelType: "Always",
      placeholder: dropDownName,
    });
    dropDownList.appendTo(inputEle);
    inputEle.setAttribute("name", dropDownName);
  }


}
