import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	newPet: any;
	errors: any;
  constructor(private _httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.newPet = {
  		name: '',
  		type: '',
  		description: '',
  		skill_1: '',
  		skill_2: '',
  		skill_3: '',
  }
}
  onSubmit(){
  	let observable = this._httpService.createPet(this.newPet)
  	observable.subscribe(data=>{
  		if ('error' in data) {
  			this.errors = data
  			console.log(this.errors)
  		} else {
  			this.router.navigate([''])
  		}
  	})
  }

  onCancel(){
    this.router.navigate([''])
  }

}
