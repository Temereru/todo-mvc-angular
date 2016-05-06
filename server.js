var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser')
var expressJWT = require('express-jwt');

mongoose.connect('mongodb://localhost/todo-list');

var Todo = require('./todoModel');
var User = require('./userModel');

var auth = expressJWT({secret: 'SECRET'});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));
app.use(express.static('node_modules'));

var LocalStrategy = require('passport-local').Strategy;

app.get('/todos', function(req, res){
  Todo.find(function (error, todos) {
    res.send(todos);
  });
});

app.post('/todos', auth, function(req, res){
  var todo = new Todo(req.body);

  todo.save(function(err, todo) {
    if (err) { return next(err); }

    res.json(todo);
  });
});

app.put('/todos/:id', auth, function(req, res){
  Todo.findOne({id: req.params.id}, function(error, todo){
    if (error) { return next(error); }
    todo.title = req.body.title;
    todo.completed = req.body.completed;

    todo.save(function(err, todo){
      if (err) { return next(err); }

      res.json(todo);
    });
  });
});

app.delete('/todos/:id', auth, function(req, res){
  Todo.findOneAndRemove({id: req.params.id}, function(error, todo){
    res.end();
  });
});

app.post('/register', function(req,res){
  User.findOne({username: req.body.username}, function(err, user){
    if (err) { return done(err); }

      if (!user) {
        var user = new User();

        user.username = req.body.username;
        user.setPassword(req.body.password);

        user.save(function (err){
          if(err){ return next(err); }

          return res.json({token: user.generateJWT()});
        })
      }else{
        return res.send('Username already in use.');
      }
  })
  
});

passport.use('login', new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(user.validPassword(password))) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }
));

app.post('/login', function(req,res,next){
  passport.authenticate('login', function(err, user){
    if(err){ return next(err); }

    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401);
    }
  })(req, res, next);
});


app.listen(8080);
