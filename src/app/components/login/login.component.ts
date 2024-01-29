import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

    constructor(private _fb:FormBuilder, private _AuthService:AuthService, private _Router:Router, private toastr: ToastrService) {}

    ngOnInit(): void {
      this.createForm();
    }

    loginForm!:FormGroup ;

    createForm():void {
      this.loginForm = this._fb.group({
        email:['', [Validators.required, Validators.email, Validators.pattern(/com$/)]],
        password:['', [Validators.required, Validators.minLength(7)]],
      })
    }

    login(formData:FormGroup):void {
      if(formData.valid) {
        this._AuthService.login(formData.value).subscribe({
          next:(response) => {
            if(response.message === 'success') {
              localStorage.setItem('userToken', response.token);
              this._AuthService.userData();
              this._Router.navigate(['/home']);
            } else {
              this.toastr.warning(response.message,'error')
            }
          },
          error:(err) => console.log(err)
        })
      }
    }
}
