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

  teacherData: Teacher[] = [];
  studentData: Student[] = [];
  courseData: Course[] = [];
  classData: Class[] = [];
  groupData: Group[] = [];


  constructor() { }
}
