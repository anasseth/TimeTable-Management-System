import { Component } from '@angular/core';
import {
  EventSettingsModel, TimeScaleModel, GroupModel, View, DragAndDropService, CallbackFunction,
  ScheduleComponent, DayService, WeekService, MonthService, AgendaService, ResizeService
} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [DayService, WeekService, MonthService, AgendaService, ResizeService, DragAndDropService],

})
export class AppComponent {
  title = 'timetable';

}
