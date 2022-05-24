import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public dialog: MatDialog, private api : ApiService) {
  }
  ngOnInit(): void {
    this.getAllEvents();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }
  getAllEvents(){
    this.api.getEvent()
    .subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        alert("error")
      }
    })
  }
}
