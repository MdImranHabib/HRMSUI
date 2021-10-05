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

  obj:any;
  loginModel:Login;

  constructor(public service:AuthService,
    private toastr:ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){   
    if(form.valid){
      this.service.login().subscribe(res =>{               
        this.loginModel = res as any;
        this.router.navigate(['/dashboard']);
        this.toastr.success('Login Successful!');       
        
      },
      err =>{
        console.log(err);
        this.toastr.error('Login Failed');
      });
    }
  }

}
