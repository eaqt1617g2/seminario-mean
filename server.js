/**
 * Created by Jordi on 27/09/2016.
 */
//server.js

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
mongoose.connect('mongodb://localhost:27017/test');

// Configuración
/*app.configure(function() {
    // Localización de los ficheros estáticos
    app.use(express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola
    app.use(express.logger('dev'));
    // Permite cambiar el HTML con el método POST
    app.use(express.bodyParser());
    // Simula DELETE y PUT
    app.use(express.methodOverride());
});*/


// Definición de modelos
/*var Todo = mongoose.model('grupo2', {
var Schema = mongoose.Schema
var Todo = new Schema({
    Nombre: {type: String},
    Apellido: {type: String},
    alumno_id: {type: String}
});

 var  TodoModel = mongoose.model('grupo2',Todo);

*/
// Definición de modelos
var Todo = mongoose.model('grupo2', {
    Nombre: String,
    Apellido: String,
    alumno_id: String,
    email: String,
    idiomas: String
});



// Rutas de nuestro API
// GET de todos los TODOs
app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if(err) {
            res.send(err);
        }
        res.json(todos);
    });
});

// POST que crea un TODO y devuelve todos tras la creación
app.post('/api/todos', function(req, res) {
    Todo.create({
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        alumno_id: req.body.alumno_id,
        email: req.body.email,
        idiomas: req.body.idiomas,
        done: false
    }, function(err, todo){
        if(err) {
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });
    });
});


/*app.post('/api/todos', function(req, res) {
    var Todo = new TodoModel({
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        alumno_id: req.body.alumno_id
    });
        Todo.save(function(err, todo){
        if(err) {
            res.send(err);
        }
    });
});*/

// DELETE un TODO específico y devuelve todos tras borrarlo.
app.delete('/api/todos/:todo', function(req, res) {
    Todo.remove({
        _id: req.params.todo
    }, function(err, todo) {
        if(err){
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });

    })
});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

// Escucha en el puerto 2709 y corre el server
app.listen(2709, function() {
    console.log('App listening on port 2709');
});