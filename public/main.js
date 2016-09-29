var app = angular.module('listaUsuarios', []);  

app.controller("listaCtrl", function($scope, $http) {
    
    
    $http.get('http://localhost:2709/api/users')
        .success(function(data) {
            $scope.users = data;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


   
    $scope.createUser = function(user){
        $http.post('http://localhost:2709/api/users', user)
            .success(function(data) {
                user = {};
                $scope.users = data;

            })
            .error(function(data) {

            });
    };

    
    $scope.deleteUser = function(id) {
        $http.delete('/api/users/' + id)
            .success(function(data) {
                $scope.users = data;
                console.log("Entrada borrada");
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

});