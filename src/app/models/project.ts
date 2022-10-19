import {Section} from "./report";

export interface Project {
  reports: any[];
  id: number;
  name: string;
  website: string;
  logo: string;
  description: string;
  category: string;
  percentage: number;
  sections: Section[];
}


export interface ProjectScore {
  rank: number;
  id: string;
  name: string;
  logo: string;
  website: string;
  percentage: number;
  valueProposition: number;
  tokenomics: number;
  team: number;
  regulatory: number;
  community: number;
}
