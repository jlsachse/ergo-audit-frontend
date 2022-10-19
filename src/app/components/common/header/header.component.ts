import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  walletAddress: string|null = '';
  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.authService.connect().then((address: string|null) => {
      this.walletAddress = address;
      this.userService.setCurrentUser(this.walletAddress);
    });
  }

  async connectWallet() {
    this.walletAddress = await this.authService.connect()
  }
}
