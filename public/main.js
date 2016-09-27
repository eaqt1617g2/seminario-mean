var app = angular.module('listaUsuarios', []);  

app.controller("listaCtrl", function($scope) {  
    

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
    $http.get('/api/usuarios')
        .success(function(data) {
            $scope.users = data;
            console.log(users)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    /*
    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createTodo = function(){
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
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
    */
});