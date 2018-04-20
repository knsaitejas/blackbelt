import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	id:any;
  pet: any;
  updatePet: any;
  errors: any;
  constructor(private _httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params=>{
      this.id=params.id
      console.log(this.id)
    })
    this.getPetFromService()
  } 

  getPetFromService(){
    let observable = this._httpService.getPet(this.id)
    observable.subscribe(data=>{
      this.pet = {
      name: data.name,
      type: data.type,
      description: data.description,
      skill_1: data.skill_1,
      skill_2: data.skill_2,
      skill_3: data.skill_3,
    }
      // console.log(this.pet)
    })
  }

  onCancel(){
    this.router.navigate(['details/', this.id])
  }

  editThePet(){
    this.updatePet={
      name: this.pet.name,
      type: this.pet.type,
      description: this.pet.description,
      skill_1: this.pet.skill_1,
      skill_2: this.pet.skill_2,
      skill_3: this.pet.skill_3,
    }
    let observable = this._httpService.editPet(this.id,this.updatePet)
    observable.subscribe(data =>{
      if ('error' in data){
        this.errors=data
        console.log(this.errors)
      } else {
        this.router.navigate(['details/',this.id])
      }
    })
  }

}
