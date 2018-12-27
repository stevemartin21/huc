import { Component, OnInit } from '@angular/core';
import { CreateDataService } from '../../services/create-data.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent implements OnInit {

  constructor(private createDataService: CreateDataService) { }

  ngOnInit() {
  }

  logout() {
    this.createDataService.logout();
  }

}
