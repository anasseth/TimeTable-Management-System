import { Injectable } from '@angular/core';
import { Class } from '../models/class';
import { Course } from '../models/course';
import { Group } from '../models/group';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  isDataUpdated: boolean = false;
  teacherData: Teacher[] = [];
  studentData: Student[] = [];
  courseData: Course[] = [];
  classData: Class[] = [];
  groupData: Group[] = [];

  resourceStudentData: Student[] = [

  ]

  resourceDataColor: any[] = [
    { name: "Red", id: 1, color: "#e42b4e" },
    { name: "Purple", id: 2, color: "#be29ec" },
    { name: "Yellow", id: 3, color: "#fcb529" },
    { name: "Blue", id: 4, color: "#20a7db" },
  ];

  public resourceDataSourceType = [
    { name: "Examen", id: 1 },
    { name: "Test", id: 2 },
    { name: "Classe", id: 3 },
    { name: "Laboratoire", id: 4 },
  ];

  public resourceDataSourceTeacher: Teacher[] = [
    { name: "Prof. Tom Hall", id: 1 },
    { name: "Prof. John Den", id: 2 },
  ];

  public resourceDataSourceCourse: Course[] = [
    { name: "Introduction à La Comptabilité Financière", id: 1 },
    { name: "Probabilité Et Statistiques", id: 2 },
  ];

  public resourceDataClassGroup: Group[] = [
    { name: "Grouper A", id: 1, parent_group_id: 1 },
    { name: "Grouper B", id: 2, parent_group_id: 1 },
  ];

  public resourceDataParentGroup: Group[] = [
    { name: "Parent Grouper A", id: 1 },
    { name: "Parent Grouper B", id: 2 },
  ];

  public resourceDataSourceRoom: Class[] = [
    { name: "Chambre # 54", id: 1 },
    { name: "Chambre # 55", id: 2 },
  ];

  timeTableData: any = [
    {
      Type: 1,
      Teacher: 1,
      Room: 1,
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
      Room: 2,
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
    }
  ];


}
