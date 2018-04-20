import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  createPet(object){
  	console.log(object)
  	return this._http.post('/pets',{name: object.name, type: object.type, description: object.description, skill_1: object.skill_1, skill_2: object.skill_2, skill_3: object.skill_3})
  }

  getPets(){
  	return this._http.get('/pets')
  }

  getPet(id){
  	return this._http.get('/pets/'+id)
  }

  likePet(id){
  	return this._http.get('/pet/vote/'+id)
  }

  deletePet(id){
  	return this._http.delete('/pet/'+id)
  }

  editPet(id, object){
  	console.log(id, object)
  	return this._http.put('/pet/'+id, {name: object.name, type: object.type, description: object.description, skill_1: object.skill_1, skill_2: object.skill_2, skill_3: object.skill_3})
  }

}
