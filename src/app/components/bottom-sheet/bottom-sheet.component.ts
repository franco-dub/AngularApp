import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material";
import {LectureCalendar} from "../models/LectureCalendar";

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {

  lectureCalendar: LectureCalendar;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data: any) { }

  ngOnInit() {
    this.lectureCalendar = this.data as LectureCalendar;
  }

}
