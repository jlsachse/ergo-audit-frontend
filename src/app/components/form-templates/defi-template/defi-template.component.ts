import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from "@angular/router";
import {ReportService} from "../../../service/report.service";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../service/auth.service";
import {ReportDTO} from "../../../models/report";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-defi-template',
  templateUrl: './defi-template.component.html',
  styleUrls: ['./defi-template.component.css']
})
export class DefiTemplateComponent implements OnInit {

  // @ts-ignore
  defiForm: FormGroup;
  // @ts-ignore
  category: string = 'DeFi';

  user: any;
  // @ts-ignore
  address: string;
  // @ts-ignore
  projectId: string;
  // @ts-ignore
  projectName: string;
  // @ts-ignore
  walletAddress: string;
  // @ts-ignore
  reportDTO: ReportDTO = {};

  private sub: any;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private reportService: ReportService,
              private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectName = params['projectName'];
      this.address = params['address'];
      this.user = this.userService.getCurrentUser();

    });
    if (!this.user) {
      this.router.navigate(['/overview'])
    }
    let regexPatterns = { points: "^(?:[0-9]|0[1-9]|10)$" };

    this.defiForm = this.fb.group({
      noveltyPoints: [0, Validators.pattern(regexPatterns.points)],
      noveltyAnswer: '',
      competitivenessPoints: [0, Validators.pattern(regexPatterns.points)],
      competitivenessAnswer: '',
      integrationsPoints: [0, Validators.pattern(regexPatterns.points)],
      integrationsAnswer: '',
      capabilityPoints: [0, Validators.pattern(regexPatterns.points)],
      capabilityAnswer: '',
      allocationPoints: [0, Validators.pattern(regexPatterns.points)],
      allocationAnswer: '',
      insurancePoints: [0, Validators.pattern(regexPatterns.points)],
      insuranceAnswer: '',
      publicTeamPoints: [0, Validators.pattern(regexPatterns.points)],
      publicTeamAnswer: '',
      experienceTeamPoints: [0, Validators.pattern(regexPatterns.points)],
      experienceTeamAnswer: '',
      coordinationTeamPoints: [0, Validators.pattern(regexPatterns.points)],
      coordinationTeamAnswer: '',
      communityChannelsPoints: [0, Validators.pattern(regexPatterns.points)],
      communityChannelsAnswer: '',
      communityRolePoints: [0, Validators.pattern(regexPatterns.points)],
      communityRoleAnswer: '',
      communityMotivationPoints: [0, Validators.pattern(regexPatterns.points)],
      communityMotivationAnswer: '',
      accountabilityPoints: [0, Validators.pattern(regexPatterns.points)],
      accountabilityAnswer: '',
      jurisdictionQualityPoints: [0, Validators.pattern(regexPatterns.points)],
      jurisdictionQualityAnswer: '',
    })
  }

  async onSubmit() {
    const authData = await this.authService.authenticate();
    const reportDTO = this.mapToReportTO(this.defiForm.getRawValue());
    this.reportService.postReport(reportDTO, authData).subscribe(() => {
      this._snackBar.open('Report submitted successful', 'Ok');
      this.router.navigate(['/projects/' + this.projectId]);
    }, () => {
      this._snackBar.open('Report could not be submitted', 'Ok');
    })
  }

  mapToReportTO(formData: any): ReportDTO {
    const valueProposition = Math.round((+formData.noveltyPoints + +formData.competitivenessPoints + +formData.integrationsPoints) * 100 / 30);
    const tokenomics = Math.round((+formData.capabilityPoints + +formData.allocationPoints + +formData.insurancePoints) * 100 / 30);
    const team = Math.round((+formData.publicTeamPoints + +formData.experienceTeamPoints + +formData.coordinationTeamPoints) * 100 / 30);
    const community = Math.round((+formData.communityChannelsPoints + +formData.communityRolePoints + +formData.communityMotivationPoints) * 100 / 30);
    const regulatory = Math.round((+formData.accountabilityPoints + +formData.jurisdictionQualityPoints) * 100 / 20);
    const percantage = Math.round((valueProposition + tokenomics + team + community + regulatory) / 5);
    // @ts-ignore
    this.reportDTO.projectId = this.projectId;
    this.reportDTO.authorWalletAddress = this.address;
    this.reportDTO.result = JSON.stringify(formData);
    this.reportDTO.percentage = percantage;
    this.reportDTO.sections = [
      { label : 'Value Proposition', percentage: valueProposition},
      { label : 'Tokenomics', percentage: tokenomics},
      { label : 'Team', percentage: team},
      { label : 'Community', percentage: community},
      { label : 'Regulatory', percentage: regulatory},
    ];
    return  this.reportDTO;
  }



}
