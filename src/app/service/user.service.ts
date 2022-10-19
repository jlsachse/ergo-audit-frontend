import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private _snackBar: MatSnackBar) {}

  currentUser: any;
  user: any;

  getUsers() {
    return this.http.get(environment.apiUrl + '/users');
  }

  getUserByWalletAddress(address: string) {
    return this.http.get(environment.apiUrl + '/users/' + address);
  }

  saveUser(user: User, auth: any) {
    if (auth) {
      const headers = new HttpHeaders({
        walletAddress: auth.walletAddress,
        signedMessage: auth.signedMessage,
        signature: auth.signature
      });
      return this.http.post(environment.apiUrl + '/users', user, {
        headers
      });
    }
    return null;
  }

  setCurrentUser(address: string|null) {
    const user = this.http.get(environment.apiUrl + '/users/' + address);
    user.subscribe( user => {
        this.currentUser = user;
      },
      () => {
        this._snackBar.open('User could not be find', 'Ok')

      }
    );
    return user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getUser() {
    return this.user;
  }
}


