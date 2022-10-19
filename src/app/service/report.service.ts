import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ReportDTO} from "../models/report";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReport(id: number) {
    return this.http.get(environment.apiUrl + '/reports/' + id);
  }

  postReport(postReport: ReportDTO, auth: any) {
      const headers = new HttpHeaders({
        walletAddress: auth.walletAddress,
        signedMessage: auth.signedMessage,
        signature: auth.signature
      });
      return this.http.post(environment.apiUrl + '/reports',postReport, {headers});
  }

}
