import { Service } from './services.model';

export interface Church {
  id: String;
  title: String;
  history: String;
  year: String;
  denomination: String;
  city: String;
  county: String;
  imagePath: String;
  services:  Service[];
}

