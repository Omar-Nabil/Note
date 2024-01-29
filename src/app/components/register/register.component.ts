import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

    constructor(private _fb:FormBuilder, private _AuthService:AuthService, private _Router:Router, private toastr: ToastrService) {}

    ngOnInit(): void {
      this.createForm();
    }

    registerForm!:FormGroup ;

    createForm():void {
      this.registerForm = this._fb.group({
        first_name:['', [Validators.required]],
        last_name:['', [Validators.required]],
        email:['', [Validators.required, Validators.email, Validators.pattern(/com$/)]],
        password:['', [Validators.required, Validators.minLength(7)]],
        age:['', [Validators.required, Validators.min(18)]],
      })
    }

    register(formData:FormGroup):void {
      if(formData.valid) {
        this._AuthService.register(formData.value).subscribe({
          next:(response) => {
            if(response.message === 'success') {
              this._Router.navigate(['/login']);
            } else {
              this.toastr.warning(response.message,'error')
            }
          },
          error:(err) => console.log(err)
        })
      }
    }
}
