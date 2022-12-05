import { HelperService } from './../../services/helper.service';
import { ApiService } from './../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  title!: string;
  description!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    private apiService: ApiService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  close(data: any) {
    this.dialogRef.close(data);
  }

  /*  Add Task */
  add(data: any) {
    this.apiService.add({ title: this.title, description: this.description }).subscribe((response: any) => {
      console.log('response :', response);
      this.helper.openSnackBar('To do task added successfully!')
      this.close(data)
    }, (error: HttpErrorResponse) => {
      console.log('error :', error);
    });
  }


}
