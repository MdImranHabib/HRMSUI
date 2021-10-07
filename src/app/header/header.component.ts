import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from '../emitters/emitters';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authenticated = false;

  constructor(public authService:AuthService,
    private toastr:ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth:boolean) => {
        this.authenticated = auth;
      }
    );
  }

  logOut(){
    this.authService.logOut();
    this.toastr.success('Loged-Out!');
    this.authenticated = false;
    //this.router.navigate(['/']);
  }

}
