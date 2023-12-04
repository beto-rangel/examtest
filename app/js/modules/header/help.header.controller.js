(function () {
    "use strict";
    angular.module("help.header.controllers", [])
        .controller("HeaderController", ["$scope", "Users","$auth", "$window", "$timeout", "SweetAlert", 
            function ($scope, Users,$auth,$window, $timeout, SweetAlert) {
            var vm = this;
            
            $scope.Usuario=JSON.parse(localStorage.getItem('usuarioHF'));
			
            vm.user = {};
            
            Users.get({id: $scope.Usuario.id}, function (response) {
                //console.log('Datos de usuario logueado:');
                vm.user = response.data;
                //console.log(response);
                //reloadGetUser();
            }, function (response) {

                //console.log('Error');
                //SweetAlert.swal("Ooops!", "No pudimos cargar los datos correctos", "error");
            });


        }]);
})();