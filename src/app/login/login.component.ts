import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  }

  onSubmit(form:NgForm){ 
    debugger  
    if(form.valid){
      this.service.login().subscribe(
        (next) => {
          this.toastr.success('Login Successful!');   
        },
        (error) => {
          console.log(error);
          this.toastr.error('Login Failed');
        },
        () => {
          this.router.navigate(['/dashboard']);
        }
      );
    }
  }  

}
