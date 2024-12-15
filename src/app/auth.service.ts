import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: any[] = [
    {
      id: 1,
      name: 'Harsha',
      email: 'harsha@gmail.com',
      password: '12345',
    },
  ];
  currentUserName: string;

  signUp(userData: any) {
    const newUser = { id: this.users.length + 1, ...userData };
    this.users.push(newUser);
  }

  signIn(name: string, pass: string) {
    const user = this.users.find((u) => u.name === name && u.password === pass);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  setUser(name: string) {
    this.currentUserName = name;

    localStorage.setItem('currentUserName', name);
  }
  constructor() {}
}
