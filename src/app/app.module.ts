import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CreateformComponent } from './createform/createform.component';

@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent,
    CreateformComponent
  ],
  imports: [
    BrowserModule, ScheduleModule, TimePickerModule,
    AppRoutingModule
  ],
  providers: [DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
