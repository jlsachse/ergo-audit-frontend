import {Project} from "./project";
import {User} from "./user";

export interface Report {
  id: number;
  author: User;
  percentage: number;
  project: Project;
  date: string;
  sections: Section[];
  result: string;
  ipfsHash: string;

}

export interface ReportDTO {
  projectId: string;
  authorWalletAddress: string;
  result: string;
  percentage: number;
  sections: Section[];
}

export interface Section {
  label: string;
  percentage: number;
}
