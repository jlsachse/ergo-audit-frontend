import {Component,  OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../service/auth.service";
import {ProjectService} from "../../../service/project.service";
import {map, Observable, startWith} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-start-audit-form',
  templateUrl: './start-audit-form.component.html',
  styleUrls: ['./start-audit-form.component.css']
})
export class StartAuditFormComponent implements OnInit {
  // @ts-ignore
  user: any;
  // @ts-ignore
  startForm: FormGroup;
  // @ts-ignore
  userForm: FormGroup;
  // @ts-ignore
  projectForm: FormGroup;

  loaded: boolean = false;

  projects: any = [];

  projectControl = new FormControl('');
  // @ts-ignore
  filteredProjects: Observable<any[]>;


  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private projectService: ProjectService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.defineFormGroups();
    this.getProjectsNames('dao');
    this.user = this.userService.getCurrentUser();
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.userForm.controls['logo'].setValue('');
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          let imgBase64Path = e.target.result.split(',')[1];
          this.userForm.controls['logo'].setValue(imgBase64Path);
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
    }
  }

  async onSubmit() {
    if(!this.user) {
      const auth = await this.authService.authenticate();
      const user = this.userForm.value;
      if (auth) {
        user.walletAddress = auth.walletAddress;
        this.userService.saveUser(user, auth)?.subscribe( (user) =>
          {
            this.user = user;
            this._snackBar.open('Auditor created', 'Ok')
          },
          (err) => {
            this._snackBar.open(err.message, 'Ok')
          }
        );
      }
    } else {
      // @ts-ignore
      this.router.navigate(['/defi-template'], {queryParams: {projectId: this.projectControl.value.id, projectName: this.projectControl.value.name, address: this.user.walletAddress}});
    }
  }

  getProjectsNames(category: string) {
    this.projects = [];
    this.projectService.getProjects(category,true).subscribe((res: any) => {
      this.projects = res._embedded.getProjectMinimals;
      this.filteredProjects = this.projectControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    })
  }

  defineFormGroups() {
    this.userForm = this.fb.group({
      name: '',
      logo: '',
      twitter: '',
      discord: '',
      email: '',
    });

    this.startForm = this.fb.group({
      username: '',
      email: ['', Validators.email],
      walletAddress: '',
      reportCategory: '',
      project: '',
      description: '',
      website: '',
      repository: ''
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value;
    return this.projects.filter((project: any) => project.name.toLowerCase().startsWith(filterValue));
  }

  displayFn(project: any): string {
    return project && project.name ? project.name : '';
  }

}
