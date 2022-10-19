import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(category: string, minimal: boolean) {
    const options: any = {};
    if (minimal) {
      options.headers = new HttpHeaders({'Prefer': 'respond-for=selection'});
    }
    return this.http.get(environment.apiUrl + '/projects?category=' + category, options);
  }


  getProject(id: number) {
    return this.http.get(environment.apiUrl + '/projects/' + id);
  }
}
