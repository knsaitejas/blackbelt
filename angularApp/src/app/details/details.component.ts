import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	id: any;
	pet: any;
  show: any;
  constructor(private _httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params=>{
  		this.id=params.id
  		console.log(this.id)
  	})
    this.show = true;
  	this.getPetFromService()
  }

  getPetFromService(){
  	let observable = this._httpService.getPet(this.id)
  	observable.subscribe(data=>{
  		console.log(data)
  		this.pet = data 
  	})
  }

  likeThePet(){
  	console.log('liked a pet')
  	let observable = this._httpService.likePet(this.id)
  	observable.subscribe(data=>{
  		console.log(data)
  		this.getPetFromService()
      this.show = false
  	})
  }

  deleteThePet(){
  	let observable = this._httpService.deletePet(this.id)
  	observable.subscribe(data=>{
  		console.log(data)
  		this.router.navigate([''])
  	})
  }

}
