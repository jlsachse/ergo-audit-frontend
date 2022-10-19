import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../service/project.service";
import {ProjectScore} from "../../../models/project";


@Component({
  selector: 'app-dapp-table',
  templateUrl: './dapp-table.component.html',
  styleUrls: ['./dapp-table.component.css']
})
export class DappTableComponent implements OnInit {

  loaded: boolean = false;

  constructor(private projectService: ProjectService) {
  }
  displayedColumns: string[] = ['rank','name', 'total','valueProposition', 'tokenomics', 'team', 'community', 'regulatory' ];

  projects: ProjectScore[] = [];

  ngOnInit(): void {
    this.projectService.getProjects('', false).subscribe(
      proj => {
        // @ts-ignore
        this.mapToProjects(proj._embedded.getProjects);
        this.loaded = true;
      },
      error => console.log(error)
    )
  }

  mapToProjects(projects: any) {
    projects.forEach((proj: any) => {
      // @ts-ignore
      let project: ProjectScore = {};
      project.id = proj.id;
      project.name = proj.name;
      project.logo = proj.logo;
      project.percentage = proj.percentage;
      project.website = proj.website;
      if (proj.scores && proj.scores.length > 0) {
        project.valueProposition = proj.scores[0].percentage;
        project.tokenomics = proj.scores[1].percentage;
        project.team = proj.scores[2].percentage;
        project.community = proj.scores[3].percentage;
        project.regulatory = proj.scores[4].percentage;
      }

      this.projects.push(project);
      this.projects.sort((a, b) => {return b.percentage - a.percentage})
      this.projects.map((project,i) => project.rank = i + 1);
    })
  }
}
