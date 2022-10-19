import { Injectable } from '@angular/core';
import { EIP12Connection, EIP12ErgoAPI } from '@nautilus-js/eip12-types';
import { environment } from '../../environments/environment';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  private authData: {
    walletAddress: string,
    signedMessage: string,
    signature: string
  } = {};
  private nautilus: EIP12Connection | undefined = undefined;
  private ergo: EIP12ErgoAPI | undefined = undefined;

  constructor(private userService: UserService) {
    if (ergoConnector !== undefined && ergoConnector['nautilus'] !== undefined) {
      this.nautilus = ergoConnector['nautilus'];
    }
  }

  async connect() {
    if (this.nautilus !== undefined) {
      await this.nautilus.connect();
      this.ergo = await this.nautilus.getContext();
      this.authData.walletAddress = await this.ergo.get_change_address();
      this.userService.setCurrentUser(this.authData.walletAddress);
    }
    return this.authData.walletAddress;
  }

  async authenticate() {
    if (this.ergo !== undefined) {
      this.authData.walletAddress = await this.ergo.get_change_address();
      const addressNonce = await fetch(environment.apiUrl + '/addressNonce', {
        method: 'POST',
        body: JSON.stringify({
          "walletAddress": this.authData.walletAddress,
        }),
        headers: {
          'Content-type': 'application/json;'
        }
      });
      const response = await addressNonce.json();
      const nonce = response['nonce'];

      const {signedMessage, proof} = await this.ergo.auth(this.authData.walletAddress, nonce);
      this.authData.signedMessage = signedMessage;
      this.authData.signature = proof;
      return this.authData;
    } else {
      return null;
    }
  }
}
