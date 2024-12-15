import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials: any = {};
  constructor(private route: Router, private authService: AuthService) {}
  onSubmit(form: NgForm) {
    this.authService.setUser(form.value.name);
    if (this.authService.signIn(form.value.name, form.value.password)) {
      this.route.navigate(["/home"]);
    } else {
      alert("user not found!");
    }
  }
  create() {
    this.route.navigate(['/sign-up']);
  }
}
