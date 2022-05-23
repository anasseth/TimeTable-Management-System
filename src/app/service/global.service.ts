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
    { name: "Exam", id: 1 },
    { name: "Test", id: 2 },
    { name: "Class", id: 3 },
    { name: "Lab", id: 4 },
  ];

  public resourceDataSourceTeacher: Teacher[] = [
    { name: "Prof. Tom Hall", id: 1 },
    { name: "Prof. John Den", id: 2 },
    { name: "Prof. Daniel J. Post", id: 3 },
    { name: "Prof. Walter M. Espinal", id: 4 },
    { name: "Assistant Prof. Don S. Croteau", id: 5 },
  ];

  public resourceDataSourceCourse: Course[] = [
    { name: "Introduction To Financial Accounting", id: 1 },
    { name: "Probablity & Stats", id: 2 },
    { name: "GeoEconomics", id: 3 },
    { name: "Natural Language Processing", id: 4 },
    { name: "Networking Data Layer", id: 5 },
  ];

  public resourceDataClassGroup: Group[] = [
    { name: "Group A", id: 1 },
    { name: "Group B", id: 2 },
    { name: "Group C", id: 3 },
    { name: "Group D", id: 4 },
    { name: "Group E", id: 5 },
  ];

  public resourceDataSourceRoom: Class[] = [
    { name: "Room# 54", id: 1 },
    { name: "Room# 55", id: 2 },
    { name: "Room# 56", id: 3 },
    { name: "Room# 57", id: 4 },
    { name: "Room# 58", id: 5 },
    { name: "Auditorium Hall", id: 6 },
    { name: "Computational Lab# 1", id: 7 },
    { name: "Computational Lab# 2", id: 8 },
  ];

  timeTableData:any = [
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

}
