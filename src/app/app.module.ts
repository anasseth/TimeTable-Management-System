import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from './login/login.component';
import { TimetableComponent } from "./timetable/timetable.component";
import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
} from "@syncfusion/ej2-angular-schedule";
import { TimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { CreateformComponent } from "./createform/createform.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatDialogModule,
  MatChipsModule,
  MatTabsModule,
} from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, TimetableComponent, CreateformComponent, LoginComponent],
  imports: [
    BrowserModule,
    ScheduleModule,
    TimePickerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
  ],
  entryComponents: [CreateformComponent],

  bootstrap: [AppComponent],
})
export class AppModule { }
