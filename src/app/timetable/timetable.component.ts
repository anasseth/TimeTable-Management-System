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
  public selectedDate: Date = new Date();

  // public currentView: View = 'Month';
  // public showWeekend: Boolean = true;

  public resourceDataSourceType: Object[] = [
    { Text: "Exam", Id: 1, Color: "#e5b7e5" },
    { Text: "Test", Id: 2, Color: "#a1ffe0" },
    { Text: "Class", Id: 3, Color: "#b1b5ff" },
    { Text: "Lab", Id: 4, Color: "#fffbe7" },
  ];

  public resourceDataSourceTeacher: Object[] = [
    { Text: "Prof. Tom Hall", Id: 1 },
    { Text: "Prof. John Den", Id: 2 },
    { Text: "Prof. Daniel J. Post", Id: 3 },
    { Text: "Prof. Walter M. Espinal", Id: 4 },
    { Text: "Assistant Prof. Don S. Croteau", Id: 5 },
  ];

  public resourceDataSourceCourse: Object[] = [
    { Text: "Introduction To Financial Accounting", Id: 1 },
    { Text: "Probablity & Stats", Id: 2 },
    { Text: "GeoEconomics", Id: 3 },
    { Text: "Natural Language Processing", Id: 4 },
    { Text: "Networking Data Layer", Id: 5 },
  ];

  public resourceDataSourceRoom: Object[] = [
    { Text: "Room# 54", Id: 1 },
    { Text: "Room# 55", Id: 2 },
    { Text: "Room# 56", Id: 3 },
    { Text: "Room# 57", Id: 4 },
    { Text: "Room# 58", Id: 5 },
    { Text: "Auditorium Hall", Id: 6 },
    { Text: "Computational Lab# 1", Id: 7 },
    { Text: "Computational Lab# 2", Id: 8 },
  ];

  // public group: GroupModel = { resources: ['Conferences'] };
  public eventSettings: EventSettingsModel = {
    // dataSource: this.data,
    fields: {
      subject: { title: "course", name: "course" },
      location: { title: "course code", name: "course code" },
      description: { title: "Summary", name: "Description" },
      startTime: { title: "From", name: "StartTime" },
      endTime: { title: "To", name: "EndTime" },
      // course: { title: 'course ', name: "course" },
    },
  };
  constructor() { }

  ngOnInit() { 
 
    
  }
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === "Editor") {
      if (!args.element.querySelector('.custom-field-row')) {
        this.createCustomDropdown(args, this.resourceDataSourceTeacher, "Text", "Id", "Teacher")
        this.createCustomDropdown(args, this.resourceDataSourceRoom, "Text", "Id", "Room/Hall")
        this.createCustomDropdown(args, this.resourceDataSourceCourse, "Text", "Id", "Course")
      }
    }
  }

  createCustomDropdown(args, dataSource, propName1, propName2, dropDownName) {
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
      dataSource: dataSource,
      fields: { text: propName1, value: propName2 },
      value: (<{ [key: string]: Object }>args.data).EventType as string,
      floatLabelType: "Always",
      placeholder: dropDownName,
    });

    dropDownList.appendTo(inputEle);
    inputEle.setAttribute("name", "EventType");
  }


}
