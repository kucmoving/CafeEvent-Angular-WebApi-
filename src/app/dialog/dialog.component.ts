import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../service/api.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  staffList = ["Andy", "Billy", "Cindy"];
  eventForm!: FormGroup;
  actionType: string = "Save";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      date: ['', Validators.required],
      category: ['', Validators.required],
      company: ['', Validators.required],
      person: ['', Validators.required],
      numbers: ['', Validators.required],
      staff: ['', Validators.required],
      amount: ['', Validators.required],
      remarks: ['', Validators.required],
    });
    console.log(this.editData)

    if (this.editData) {
      this.actionType = "Update";
      this.eventForm.controls["date"].setValue(this.editData.date);
      this.eventForm.controls["category"].setValue(this.editData.category);
      this.eventForm.controls["company"].setValue(this.editData.company);
      this.eventForm.controls["person"].setValue(this.editData.person);
      this.eventForm.controls["numbers"].setValue(this.editData.numbers);
      this.eventForm.controls["staff"].setValue(this.editData.staff);
      this.eventForm.controls["amount"].setValue(this.editData.amount);
      this.eventForm.controls["remarks"].setValue(this.editData.remarks);
    }
  }

  addEvent() {
    if (!this.editData) {
      if (this.eventForm.valid) {
        this.api.postEvent(this.eventForm.value)
        .subscribe({
          next: (res) => {
            alert("Event is added.");
            this.eventForm.reset();
            this.dialogRef.close("save");
          },
          error: () => {
            alert("event is not added.");
          }
        })
      }
    }else{
      this.updateEvent()
    }
  }
  updateEvent(){
    this.api.putEvent(this.eventForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Event is updated");
        this.eventForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert('ERROR');
      }
    })
  }
}
