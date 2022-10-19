import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../service/project.service";
import {Project} from "../../../models/project";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit, OnDestroy {
  loaded: boolean = false;
  // @ts-ignore
  id: number;
  private sub: any;
  // @ts-ignore
  project: Project = {};
  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) { }

  // @ts-ignore
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.projectService.getProject(this.id).subscribe( res => {
      this.mapToProject(res);
    })
  }

  mapToProject(projectResponse: any) {
    // @ts-ignore
    const {id, name, description, logo, percentage, website, scores, category} = projectResponse;
    this.project.name = name;
    this.project.description = description;
    this.project.logo = logo;
    this.project.id = id;
    this.project.website = website;
    this.project.category = category;
    this.project.percentage = percentage;
    this.project.sections = scores;
    // @ts-ignore
    this.project.reports = projectResponse._embedded?.reports;
    this.loaded = true;
    console.log(this.project.reports);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
