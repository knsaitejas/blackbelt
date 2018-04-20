//modules to import 
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
//create an express app
var app = express();
//allow our app to use / set various technologies and folders
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static( __dirname + '/angularApp/dist' ));

mongoose.connect('mongodb://localhost/blackbelt');

var petsSchema = new mongoose.Schema({
	name: {type: String, minlength: [3, 'Name must be at least three characters long'], required: [true, 'Name is required']},
	type: {type:String, minlength: [3, 'Type must be at least three characters long'],required: [true, 'Type is required']},
	description: {type:String, minlength: [3, 'Description must be at least three characters long'],required: [true, 'Description is required']},
	skill_1: {type:String},
	skill_2: {type:String},
	skill_3: {type:String},
	likes: {type:Number, default: 0},
	created_at: {type: Date, default: Date.now },
	updated_at: {type: Date, default: Date.now }
})

mongoose.model('Pet', petsSchema);
var Pet = mongoose.model('Pet')

mongoose.Promise = global.Promise;
//find pets
app.get('/pets', function(req, res){
	Pet.find({}, function(err, pets){
		res.json(pets)
	})
})
//create pet
app.post('/new', function(req, res){
	console.log('in the server.js folder')
	console.log(req.body)
	var petInstance = new Pet()
	petInstance.name = req.body.name
	petInstance.type = req.body.type
	petInstance.description = req.body.description
	petInstance.skill_1 = req.body.skill_1
	petInstance.skill_2 = req.body.skill_2
	petInstance.skill_3 = req.body.skill_3
	console.log(petInstance)
	petInstance.save(function(err){
		if(err){
			res.json({'error':err})
		} else {
			res.json({'message':'success'})
		}
	})
})
//find a pet
app.get('/details/:id', function(req, res){
	Pet.findOne({_id: req.params.id}, function(err, pet){
		if (err){
			res.json({'error':err})
		} else {
			res.json(pet)
		}
	})
})

//like a pet
app.get('/pet/vote/:id', function(req, res){
	console.log('just liked')
	Pet.findOne({_id: req.params.id}, function(err, pet){
		pet.likes += 1
		pet.save(function(err){
			if (err){
			res.json({'error':err})
		} else {
			res.json({'message': 'success'})
		}
		})
	})
})
//remove a pet
app.delete('/pet/:id', function(req, res){
	console.log('deleting')
	Pet.remove({_id: req.params.id}, function(err){
		if (err){
			res.json({'error':err})
		} else {
			res.json({'message': 'success'})
		}
	})
})
//edit a pet
app.put('/edit/:id', function(req, res){
	console.log(req.params.id)
	Pet.findOne({_id: req.params.id}, function(err, pet){
	pet.name = req.body.name
	pet.type = req.body.type
	pet.description = req.body.description
	pet.skill_1 = req.body.skill_1
	pet.skill_2 = req.body.skill_2
	pet.skill_3 = req.body.skill_3
	pet.save(function(err){
		if(err){
			res.json({'error': err})
		} else {
			res.json({'message': 'success'})
		}
	})
})
	
})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./angularApp/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})



