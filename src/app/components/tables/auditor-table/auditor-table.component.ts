import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {User} from "../../../models/user";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


export interface Auditor {
  name: string;
  logo: string;
  exp: number;
  twitter: string;
}

@Component({
  selector: 'app-auditor-table',
  templateUrl: './auditor-table.component.html',
  styleUrls: ['./auditor-table.component.css']
})
export class AuditorTableComponent implements OnInit {
  users: User[] = [];
  loaded: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      // @ts-ignore
      this.users.push(...users._embedded.getUsers);
      this.users.sort((a, b) => b.experience - a.experience);
      this.loaded = true;
    })
  }

  displayedColumns: string[] = ['name', 'experience', 'twitter'];


}
