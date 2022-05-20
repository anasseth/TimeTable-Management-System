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
    { Text: "tom", Id: 1 },
    { Text: "danial", Id: 2 },
    { Text: "john", Id: 3 },
    { Text: "jeef", Id: 4 },
    { Text: "adam", Id: 4 },
  ];

  public resourceDataSourceCourse: Object[] = [
    { Text: "math", Id: 1 },
    { Text: "physics", Id: 2 },
    { Text: "chemistry", Id: 3 },
    { Text: "english", Id: 4 },
    { Text: "geaometry", Id: 5 },
  ];

  public resourceDataSourceRoom: Object[] = [
    { Text: "Room 1", Id: 1 },
    { Text: "Rom 2", Id: 2 },
    { Text: "Room 3", Id: 3 },
    { Text: "Room 4", Id: 4 },
    { Text: "Room 5", Id: 5 },
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

  ngOnInit() { }
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === "Editor") {
      if (!args.element.querySelector(".custom-field-row")) {
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
          dataSource: [
            { text: "John", value: "John" },
            { text: "Adam", value: "Adam" },
            { text: "philip", value: "philip" },
            { text: "jeff", value: "jeff" },
            { text: "Bezoz", value: "Bezoz" },

          ],
          fields: { text: "text", value: "value" },
          value: (<{ [key: string]: Object }>args.data).EventType as string,
          floatLabelType: "Always",
          placeholder: "Teacher",
        });

        dropDownList.appendTo(inputEle);
        inputEle.setAttribute("name", "EventType");

      }

    }

  }

  //   let dropDownList1: DropDownList = new DropDownList({
  //     dataSource: [
  //       { text: "Math", value: "Math" },
  //       { text: "Physics", value: "Physics" },
  //       { text: "Chemistry", value: "Chemistry" },
  //       { text: "Computer", value: "Computer" },
  //       { text: "Geometry", value: "Geometry" },

  //     ],
  //     fields: { text: "text", value: "value" },
  //     value: (<{ [key: string]: Object }>args.data).EventType as string,
  //     floatLabelType: "Always",
  //     placeholder: "Course",
  //   });
  //   dropDownList1.appendTo(inputEle);
  //   inputEle.setAttribute("name", "EventType");
  // }

  // let dropDownList2: DropDownList = new DropDownList({
  //   dataSource: [
  //     { text: "Room 1", value: "Room 1" },
  //     { text: "Room 2", value: "Room 2" },
  //     { text: "Room 3", value: "Room 3" },
  //     { text: "Room 4", value: "Room 4" },
  //     { text: "Room 5", value: "Room 5" },

  //   ],
  //   fields: { text: "text", value: "value" },
  //   value: (<{ [key: string]: Object }>args.data).EventType as string,
  //   floatLabelType: "Always",
  //   placeholder: "Room",
  // });
  // dropDownList2.appendTo(inputEle);
  // inputEle.setAttribute("name", "EventType");




  // template field
  // onPopupOpen(args: PopupOpenEventArgs): void {
  //   if (args.type === 'Editor') {
  //     let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
  //     if (!statusElement.classList.contains('e-dropdownlist')) {
  //       let dropDownListObject: DropDownList = new DropDownList({
  //         placeholder: 'Choose Type', value: statusElement.value,
  //         dataSource: ['Exam', 'Test', 'Class', 'Lab', 'Result',]
  //       });
  //       dropDownListObject.appendTo(statusElement);
  //       statusElement.setAttribute('name', 'EventType');

  //       let dropDownListObject1: DropDownList = new DropDownList({
  //         placeholder: 'teacher', value: statusElement.value,
  //         dataSource: ['t1', 't2', 't3', 't4', 't5',]
  //       });
  //       dropDownListObject1.appendTo(statusElement);
  //       statusElement.setAttribute('name', 'EventType1');
  //     }
  //     let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
  //     if (!startElement.classList.contains('e-datetimepicker')) {
  //       new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
  //     }
  //     let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
  //     if (!endElement.classList.contains('e-datetimepicker')) {
  //       new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
  //     }
  //   }
  // }

}
