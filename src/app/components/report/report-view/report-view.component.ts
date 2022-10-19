import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Report} from "../../../models/report";
import {ReportService} from "../../../service/report.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {

  // @ts-ignore
  defiForm: FormGroup;
  // @ts-ignore
  project: string;
  // @ts-ignore
  author: string;

  category: string = 'Defi';

  // @ts-ignore
  id: number;
  private sub: any;
  // @ts-ignore
  report: Report = {}

  constructor(private route: ActivatedRoute,
              private reportService: ReportService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.reportService.getReport(this.id).subscribe( res => {
      // @ts-ignore
      this.project = res._embedded.projects[0].name;
      // @ts-ignore
      this.author = res._embedded.authors[0].name;
      // @ts-ignore
      this.defiForm =  this.fb.group(JSON.parse(res.result));
    })
  }

}
