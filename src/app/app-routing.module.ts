import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TimetableComponent } from './timetable/timetable.component';

const routes: Routes = [
{
  path:"",
  component:LoginComponent
},
{
  path:"timetable",
  component:TimetableComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
