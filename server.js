/**
 * Created by Jordi on 27/09/2016.
 */

var express     = require('express');
var app         = express();
var mongoose     = require('mongoose');
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/users-seminario');


var UserModel = mongoose.model('users', {
    nombre: String,
    apellido: String,
    alumno_id: String,
    email: String    
});


app.get('/api/users', function(req, res) {
    UserModel.find(function(err, users) {
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
});


app.post('/api/users', function(req, res) {
    UserModel.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        alumno_id: req.body.alumno_id,
        email: req.body.email,        
        done: false
    }, function(err, user){
        if(err) {
            res.send(err);
        }

        UserModel.find(function(err, users) {
            if(err){
                res.send(err);
            }
            res.json(users);
        });
    });
});


app.delete('/api/users/:user', function(req, res) {
    UserModel.remove({
        _id: req.params.user
    }, function(err, user) {
        if(err){
            res.send(err);
        }

        UserModel.find(function(err, users) {
            if(err){
                res.send(err);
            }
            res.json(users);
        });

    })
});

app.use('/', express.static('public'));
app.use('/bower_components', express.static('bower_components'));

// Escucha en el puerto 2709 y corre el server
app.listen(2709, function() {
    console.log('App listening on port 2709');
});