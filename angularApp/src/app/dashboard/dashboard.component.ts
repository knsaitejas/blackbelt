import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	pets: any;
  constructor(private _httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.getPetsFromService()
  }

  getPetsFromService(){
  	let observable = this._httpService.getPets()
  	observable.subscribe(data=>{
  		this.pets = data
  		console.log(this.pets)
  	})
  }

}
