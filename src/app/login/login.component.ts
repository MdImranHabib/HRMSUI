import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from '../emitters/emitters';
import { AuthService } from '../shared/auth.service';
import { Login } from '../shared/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  //loginModel:Login;

  constructor(public service:AuthService,
    private toastr:ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    Emitters.authEmitter.emit(false);
  }

  onSubmit(form:NgForm){     
    if(form.valid){
      this.service.logIn().subscribe(
        (next) => {
          Emitters.authEmitter.emit(true);
          this.toastr.success('Login Successful!');   
        },
        (error) => {
          console.log(error);
          Emitters.authEmitter.emit(false);
          this.toastr.error('Login Failed');
        },
        () => {
          this.router.navigate(['/dashboard']);
        }
      );
    }
  }  

}
