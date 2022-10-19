import {Report} from "./report";

export interface User {
  id: string;
  logo: string;
  name: string;
  twitter: string;
  discord: string;
  email: string;
  reports: Report[];
  walletAddress: string;
  experience: number;
}
