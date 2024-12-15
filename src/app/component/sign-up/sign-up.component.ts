import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  userData: any = {};
  passMatch: boolean = false;
  constructor(private route: Router, private authService: AuthService) {}
  onSubmit(form: NgForm) {
    console.log(form.value.password, form.value.cPassword);
    this.userData.name = form.value.name;
    this.userData.email = form.value.email;
    this.userData.password = form.value.password;
    if (form.value.password === form.value.cpassword) {
      this.authService.signUp(this.userData);
      this.authService.setUser(form.value.name);
      this.route.navigate(['/home']);
    } else {
      alert('Enter same password');
    }
  }
}
