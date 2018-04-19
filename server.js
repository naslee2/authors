var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var validate = require('mongoose-validator')
var path = require('path');

app.use(express.static( __dirname + '/angular/dist' ));

var nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [1, 50],
      message: 'Name should be between {argument[0]} and {argument[1]} characters',
    })
  ]

var AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, validate: nameValidator},
}, {timestamps: true });

mongoose.model('Author', AuthorSchema);

var Author = mongoose.model('Author');

app.use(bodyParser.json());

app.use(express.static( __dirname + '/angular/dist' ));

mongoose.connect('mongodb://localhost/authors');

mongoose.Promise = global.Promise;

app.post('/new', function(request, response){ //add author
    var add = new Author({name: request.body.name})
    add.save(function(err){
        if(err){
            response.json({message: "Error", error: err});
        }
        else{
            response.json({message: "success"});
        }
    })
})

app.delete("/delete/:id", function(request, response)  { //delete task
    Author.remove({_id: request.params.id}, function(err){
        if(err){
            response.json({message: "Error", error: err});
        }
        else{
            response.json({message: "success"});
        }
    })
})

app.get('/author', function(request, response) { //view all tasks
    Author.find({}, function(err, task) {
    if(err) {
        console.log("returned error", err)
        response.json({message: "Error", error: err})
    }
    else {
        response.json({message: "success", data: task})
        }
    })
})

app.put("/update/:id", function(request, response) { //update task
    Author.findOne({_id: request.params.id}, function(err, author){
        author.name = request.body.name;
    author.save(function(err){
        if(err){
            console.log("error update")
            response.json({message: "Error", error: err});
        }
        else{
            console.log("success update")
            response.json({message: "success", data: author});
        }
    })
})
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular/dist/index.html"))
  });

app.listen(8000, function() {
    console.log("listening on port 8000");
})