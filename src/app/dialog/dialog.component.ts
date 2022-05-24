import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  staffList = ["Andy", "Billy", "Cindy"];
  eventForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private api : ApiService,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      date : ['', Validators.required],
      category :['', Validators.required],
      company :['', Validators.required],
      person :['', Validators.required],
      numbers :['', Validators.required],
      staff :['', Validators.required],
      amount :['', Validators.required],
      remarks :['', Validators.required],
    })
  }

  addevent(){
    if(this.eventForm.valid){
      this.api.postEvent(this.eventForm.value)
      .subscribe({
        next:(res)=>{
          alert("Event is added.");
          this.eventForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("event is not added.")
        }
      })
    }
  }

}
