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

  public resourceDataSource: Object[] = [
    { Text: "green", Id: 1, Color: "#1aaa55" },
    { Text: "blue", Id: 2, Color: "#357cd2" },
    { Text: "red", Id: 3, Color: "#d0291e" },
    { Text: "yellow", Id: 4, Color: "#e5e510" },
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
  constructor() {}

  ngOnInit() {}
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
            { text: "Exam", value: "Exam" },
            { text: "Test", value: "Test" },
            { text: "Class", value: "Class" },
            { text: "Lab", value: "Lab" },
            { text: "Meeting", value: "Meeting" },
            { text: "Result", value: "Result" },
            { text: "Event", value: "Event" },
          ],
          fields: { text: "text", value: "value" },
          value: (<{ [key: string]: Object }>args.data).EventType as string,
          floatLabelType: "Always",
          placeholder: "Type",
        });

        dropDownList.appendTo(inputEle);
        inputEle.setAttribute("name", "EventType");
      }
    }
    // if (args.type === "Editor") {
    //   if (!args.element.querySelector(".custom-field-row")) {
    //     let row: HTMLElement = createElement("div", {
    //       className: "custom-field-row",
    //     });
    //     let formElement: HTMLElement =
    //       args.element.querySelector(".e-schedule-form");
    //     formElement.firstChild.insertBefore(
    //       row,
    //       args.element.querySelector(".e-title-location-row")
    //     );
    //     let container: HTMLElement = createElement("div", {
    //       className: "custom-field-container",
    //     });
    //     let inputEle: HTMLInputElement = createElement("input", {
    //       className: "e-field",
    //       attrs: { name: "EventType" },
    //     }) as HTMLInputElement;

    //     new this.ej.inputs.Input.createInput({
    //       element: inputEle,
    //       floatLabelType: "Never",
    //       readonly: true,
    //       value: args.data.Customer_Name,
    //       name: "Customer_Name",
    //     });
    //     container.appendChild(inputEle);
    //     row.appendChild(container);
    //   }
    // }

    // template field
    // onPopupOpen(args: PopupOpenEventArgs): void {
    //   if (args.type === 'Editor') {
    //     let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
    //     if (!statusElement.classList.contains('e-dropdownlist')) {
    //       let dropDownListObject: DropDownList = new DropDownList({
    //         placeholder: 'Choose Type', value: statusElement.value,
    //         dataSource: ['Exam', 'Test', 'Class', 'Lab', 'Meeting', 'Result', 'Event']
    //       });
    //       dropDownListObject.appendTo(statusElement);
    //       statusElement.setAttribute('name', 'EventType');
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
}
