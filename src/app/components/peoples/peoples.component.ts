import { Component, OnInit, Input } from '@angular/core';
import { PeoplesService } from '../../services/peoples.service';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { People } from 'src/app/models/class/people';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: ['./peoples.component.css']
})
export class PeoplesComponent implements OnInit {

  public searchText: string;
  public peoples: People[];

  constructor(private peopleService: PeoplesService, private homeService: HomeService) { }

  ngOnInit() {
    this.peopleService.getPeoples().subscribe(data=>{
      this.peoples = data;
    })
    this.homeService.setActiveNav(true);
  }

}
