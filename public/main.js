var app = angular.module('listaUsuarios', []);  

app.controller("listaCtrl", function($scope, $http) {
    

    /*
    $scope.users = [
		{name:'Carlos',email:'carlos@gmail.com', idiomas: ["castellano", "ingles"]},
		{name:'Pepe',email:'pepe@gmail.com'},
		{name:'Juan',email:'juan@gmail.com'},
		{name:'Ana',email:'ana@gmail.com'},
		{name:'Jordi',email:'jordi@gmail.com'}
	];
	*/
    
    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('http://localhost:2709/api/todos')
        .success(function(data) {
            $scope.users = data;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createTodo = function(user){
        $http.post('http://localhost:2709/api/todos', user)
            .success(function(data) {
                user = {};
                $scope.users = data;

            })
            .error(function(data) {

            });
    };

    // Borra un TODO despues de checkearlo como acabado
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

});