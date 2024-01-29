import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { NoteService } from 'src/app/core/services/note.service';
import { NoteDataComponent } from '../note-data/note-data.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog, private _AuthService:AuthService, private _NoteService:NoteService) {

  }
  ngOnInit(): void {
    this.getData();
  }
  value = '';
  notes:any[] = [];

  addNote() {
    const dialogRef = this.dialog.open(NoteDataComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'add')
        this.getData();
    });
  }

  setData(note:any) : void {
    const dialogRef =this.dialog.open(NoteDataComponent, {
      data:{note}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'updated'){
        this.getData();
      }
    });

  }

  getData():void {
    const data = {
      token:localStorage.getItem('userToken'),
      userID:this._AuthService.user.getValue()._id
    };

    this._NoteService.getData(data).subscribe({
      next: (response) => {
        if(response.message === 'success') {
          this.notes = response.Notes;
        }
      }
    })

  }

  deleteNote(NoteID:string, index:number) :void {
    const data = {
      body:{
        NoteID: NoteID,
        token:localStorage.getItem('userToken')
      }
    }
    console.log(data);

    this._NoteService.deleteNote(data).subscribe({
      next:(response) => {
        if(response.message === 'deleted') {
          this.notes.splice(index, 1);
          this.notes = [...this.notes];
        }

      },
      error : err => console.log(err)
    })
  }
}
