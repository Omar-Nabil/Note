import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css']
})
export class NoteDataComponent implements OnInit {
  constructor(private _fb:FormBuilder, private _NoteService:NoteService, private _MatDialogRef:MatDialogRef<NoteDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

  userData:any ;

  ngOnInit(): void {
    this.createForm();
    this.userData = jwtDecode(localStorage.getItem('userToken')!)
  }
  dataForm!:FormGroup;
  createForm():void {
      this.dataForm = this._fb.group({
      title:[this.data ? this.data.note.title:"", [Validators.required]],
      desc:[this.data?this.data.note.desc:"", [Validators.required]],
      token:localStorage.getItem('userToken')
    })
  }
  sendData() {       // work on add and update
    if(this.dataForm.valid) {
      if(this.data) {
        this.updateNote();
      }
      else {
        this.addNote();
      }
    }
  }

  addNote():void {
    const data = {
      ...this.dataForm.value,
      citizenID:this.userData._id
    }
    this._NoteService.addNote(data).subscribe({
      next:(response) => {
        if(response.message === 'success') {
          this._MatDialogRef.close("add");
        }
      },
      error:(err) => console.log(err)
    })
  }

  updateNote():void {
    const data = {
      ...this.dataForm.value,
      NoteID:this.data.note._id,
      token:localStorage.getItem('userToken'),
    }
    this._NoteService.updateNote(data).subscribe({
      next:(response) => {
        if(response.message === 'updated') {
          this._MatDialogRef.close("updated");
        }
      },
      error:(err) => console.log(err)
    })
  }

}
