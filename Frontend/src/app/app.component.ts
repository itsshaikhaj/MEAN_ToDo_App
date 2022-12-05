import { HelperService } from './services/helper.service';
import { ApiService } from './services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './dialogs/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private helper: HelperService
  ) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getList()
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue :', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  /* GET TODO LIST */
  getList() {
    this.apiService.getList().subscribe((response: any) => {
      console.log('response :', response);
      this.dataSource = new MatTableDataSource(response?.data);
    }, (error: HttpErrorResponse) => {
      // this.helper.presentToastError("Something went wrong");
    });
  }

  markCompleted(id: any) {
    this.apiService.update(id, {is_completed: true}).subscribe((response: any) => {
      console.log('response :', response);
      this.helper.openSnackBar('To do task marked completed successfully!')
      this.getList();
    }, (error: HttpErrorResponse) => {
    });
  }

  delete(id: any) {
    this.apiService.delete(id).subscribe((response: any) => {
      console.log('response :', response);
      this.helper.openSnackBar('To do task deleted successfully!')
      this.getList();
    }, (error: HttpErrorResponse) => {
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == 'submitted') {
        this.getList();
      }
    });
  }
}

export interface ToDoData {
  title: string;
  description: string;
  // status: string;
  // fruit: string;
}
