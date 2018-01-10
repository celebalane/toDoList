var express= require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser'); //gestion des données envoyées en Post
var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();

app.use(session({secret: 'confidentiel'}));

app.use(function(req,res,next){
	if(typeof(req.session.todolist) == 'undefined'){ //Vérification de l'existence de la session
		req.session.todolist = [];
	}
	next();
});

app.get('/', function(req,res){ //Affichage de la page de la todolist
	res.render("index.ejs", {todolist : req.session.todolist});
});

app.post('/add/', urlencodedParser, function(req,res){   //Ajout d'une tâche
	if(req.body.newtodo != ''){
		req.session.todolist.push(req.body.newtodo);
	}
	res.redirect('/');
});

app.get('/delete/:id', function(req,res){  //suppression
	if(req.params.id != ''){
		req.session.todolist.splice(req.params.id,1);
	}
	res.redirect('/');
});

app.use(function(req, res, next){
    res.redirect('/');
});

app.listen(8080);