(function () {
    "use strict";
    angular.module("help.users.controllers", ['daypilot'])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function () {
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
	.controller("UsersReadController", ["$rootScope",  "$mdSidenav", "$scope", 'SweetAlert',"Users", "$route", 'Data', "$mdDialog", "Config",
            function ($rootScope,  $mdSidenav, $scope, SweetAlert,Users,$route, Data, $mdDialog, Config) {
			var vm = this;
			vm.Usuario=Data.Usuario;
			vm.order = 'name';
			vm.orderBy = orderBy;

			vm.editUser = modifyUser;

            vm.ruta = Config.SERVER_URL_DOWNLOAD + '/usuarios/';
                
			Users.getUsers(function (response) {
                //console.log('Usuarios:');
					//console.log(response);
					vm.users = response.items.data;
					$scope.users = response.items.data;
					$rootScope.users = response.items.data;
			}, function (response) {
					//console.log(response);
					//console.log('Error');
					//SweetAlert.swal("Ooops!", "No pudimos cargar los datos, asegúrate de tener una sesión activa", "error");
			});

            vm.token=localStorage.getItem('token');

            vm.getPdfUsers=function(){
                $scope.getUsersByPdf = Config.SERVER_URL + '/getUsersByPdf';
            }

            vm.editPasswordUser = function(ev, id) {
                    //console.log('Id Usaurio Logueado: ');
                    //console.log(id);
                    sessionStorage.setItem('usuario', id);
                    $mdDialog.show({
                        templateUrl: 'templates/users/dl_editPasswordUser.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: true // Only for -xs, -sm breakpoints.
                    })
                };
			
			$scope.isUpdate = false;
			
			function modifyUser(id, idx) {
					sessionStorage.setItem('user', id);
					sessionStorage.setItem('idx', idx);

					//console.log(id);

					if (!$mdSidenav('create').isOpen()) {
							$scope.isUpdate = false;
					}

					$mdSidenav('update').toggle().then(function () {
							$scope.isUpdate = true;
					});
			}

            $scope.activateMenuItem('mUsuarios');
			$rootScope.icon='person';
			$rootScope.title='Usuarios';
            
			function orderBy(filter) {
				vm.order = filter;
			}
			
        }])
        .controller("UsersCreateController", ["$rootScope",  "$mdSidenav", "$scope", "Users", "SweetAlert", "$route", "Config", "$http",
            function ($rootScope,  $mdSidenav, $scope,Users,SweetAlert, $route, Config, $http) {
                var vm = this;
                vm.model = {};
                vm.roles = roles;
                
                vm.saveActionButton = saveUser;

                function saveUser() {
                    vm.model.status = 'Activo';     
                    if(!vm.model.role){
                    SweetAlert.swal({
                        title: "¡Datos incompletos!",
                        text: "Debes llenar todos los campos marcados con *",
                        type: "warning",
                        showConfirmButton: false,
                        timer:3000
                    });
                    }else{

                        var fileFoto = vm.photo;
                        console.log('Foto'+ vm.photo);

                        if (fileFoto === null || angular.isUndefined(fileFoto))
                                vm.model.photo = "";
                        else
                                vm.model.photo = fileFoto.name;

                        vm.Usuario=JSON.parse(localStorage.getItem('usuarioHF'));

                        console.log(vm.model);
                                       
                    Users.postUser( vm.model, function (response) {
                        console.log(response);
                        vm.model.id = response.data.User[0].id;
                        console.log(vm.model.id);

                        if (!(fileFoto === null || angular.isUndefined(fileFoto))){
                           // vm.model.photo = fileFoto.name;

                            var fd = new FormData();
                            fd.append('id', vm.model.id);
                            fd.append('seccion','usuarios');
                            fd.append('name',vm.model.photo);
                            fd.append('carpeta','imagen');
                            fd.append('file', fileFoto);
                            console.log(fd);
                            $http.post(Config.SERVER_URL_UPLOAD, fd, {
                                    transformRequest: angular.identity,
                                    headers: {'Content-Type': undefined}
                            })
                                    .success(function(response){
                                            //Guardamos la url de la imagen y hacemos que la muestre.
                                            console.log("Se subió la foto");
                                    })
                                    .error(function(response){
                                            console.log(response);
                                            console.log("No se subió la foto");
                                    });
                                }
                        SweetAlert.swal({
                            title: "¡Usuario Creado!",
                            text: "El Usuario fue creado de forma exitosa",
                            type: "success",
                            showConfirmButton: false,
                            timer:2000
                        });
                        console.log(response);
                        $route.reload();


                    }, function (response) {
                        SweetAlert.swal({
                            title: "¡Error!",
                            text: "El Usuario no pudo ser creada, intenta de nuevo",
                            type: "error",
                            showConfirmButton: false,
                            timer:2000
                        });
                        console.log(response);
                    });
                }
            }


            }])
        
        .controller("UsersUpdateController", ["$rootScope",  "$mdSidenav", "$scope",  "Users", 'SweetAlert', '$route', "Config", "$http",
            function ($rootScope,  $mdSidenav, $scope,Users, SweetAlert,$route, Config, $http) {
                var user_id = sessionStorage.getItem('user');
				var vm = this;
                vm.model={};
                vm.retrieveUser = retrieveUser;
                vm.saveActionButton = updateUser;
                vm.roles = roles;

                function retrieveUser(userID) {

                    Users.get({id: userID}, function (response) {
                        //console.log('Datos del Usuario:');
                        console.log(response); 
                        vm.model = response.data;                     
                    }, function (response) {
                        //console.log('Error');
                        SweetAlert.swal("Ooops!", "No pudimos cargar los datos correctos", "error");
                    });
                }

                function updateUser(frm) {
                    var fileFoto = vm.photo;
                    console.log('Foto'+ vm.photo);

                    if (fileFoto === null || angular.isUndefined(fileFoto)){ 
                            vm.model.photo = vm.model.photo;
                    }else{ 
                            vm.model.photo = fileFoto.name;
                    }
                    vm.Usuario=JSON.parse(localStorage.getItem('usuarioHF'));

                    console.log(vm.model);
					
                    Users.update({id: vm.model.id}, vm.model, function (response) {
                        if (!(fileFoto === null || angular.isUndefined(fileFoto))){
                           // vm.model.photo = fileFoto.name;

                            var fd = new FormData();
                            fd.append('id', vm.model.id);
                            fd.append('seccion','usuarios');
                            fd.append('name',vm.model.photo);
                            fd.append('carpeta','imagen');
                            fd.append('file', fileFoto);
                            console.log(fd);
                            $http.post(Config.SERVER_URL_UPLOAD, fd, {
                                    transformRequest: angular.identity,
                                    headers: {'Content-Type': undefined}
                            })
                                    .success(function(response){
                                            //Guardamos la url de la imagen y hacemos que la muestre.
                                            //console.log("Se subió la foto");
                                    })
                                    .error(function(response){
                                            //console.log(response);
                                            //console.log("No se subió la foto");
                                    });
                                }
                        //console.log(response); 
                        SweetAlert.swal({
                            title: "¡Usuario Modificado!",
                            text: "Tus cambios han sido guardados de forma exitosa",
                            type: "success",
                            showConfirmButton: false,
                            timer:2000
                        });
                        $route.reload();
                    }, function (response) {
                        //console.log(response);
                        SweetAlert.swal({
                            title: "¡Error!",
                            text: "No se han podido guardar los cambios, intenta nuevamente",
                            type: "error",
                            showConfirmButton: false,
                            timer:2000
                        });
                    });
                }

                retrieveUser(user_id);
        }])
        .controller("UsersDeleteController", ["$rootScope",  "$scope", 'SweetAlert',"Users", '$route', "$mdDialog",
            function ($rootScope,  $scope, SweetAlert,Users, $route, $mdDialog) {
			
                var vm = this;
                vm.deleteUser = removeUser;

                function removeUser(id) {
                    SweetAlert.swal({
                            title: "¿Estas seguro?",
                            text: "Eliminarás al usuario ",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55", confirmButtonText: "Si, ¡elimínalo!",
                            cancelButtonText: "No, ¡Cancelar!",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                //console.log("Id");
                                //console.log(id);
                                Users.delete({id: id}, function (response) {
                                    SweetAlert.swal({
                                        title: "¡Eliminado!",
                                        text: "El usuario fue eliminado de forma exitosa",
                                        type: "success",
                                        showConfirmButton: false,
                                        timer:4000
                                    });
                                    $route.reload();
                                }, function (response) {
                                    SweetAlert.swal({
                                        title: "¡Error!",
                                        text: response.data.error.message,
                                        type: "error",
                                        showConfirmButton: false,
                                        timer:4000
                                    });
                                });
                            } else {
                                SweetAlert.swal({
                                        title: "¡Cancelado!",
                                        text: "El usuario no fue eliminado, no se ha hecho ningún cambio",
                                        type: "error",
                                        showConfirmButton: false,
                                        timer:4000
                                    });
                            }
                        });
                }
	
        }])
.controller("UserPasswordController", ["$rootScope",  "$mdSidenav", "$scope", 'SweetAlert','$mdDialog', '$timeout', '$location', '$route', "Users", "Data",
            function ($rootScope,  $mdSidenav, $scope, SweetAlert, $mdDialog, $timeout, $location, $route, Users, Data) {
                var vm = this;
                vm.model={};
                vm.user = Data.Usuario;
                var user_id = Data.Usuario.id;

                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                
                vm.saveActionButton = updateUser;
                vm.retrieveUser= retrieveUser;

                function retrieveUser(user_id) {
                    Users.get({id: user_id}, function (response) {
                        //console.log("Info del Usuario logueado:");
                        //console.log(response.data);
                        vm.model = response.data;                        
                    }, function (response) {
                        //console.log('Error');
                        SweetAlert.swal("Ooops!", "No pudimos cargar los datos correctos", "error");
                    });

                }

                function updateUser(frm) {                     
                    Users.updatePassword({id: vm.model.id}, vm.model, function (response) {
                        //console.log(response);
                        SweetAlert.swal({
                            title: "¡Password Modificado!",
                            text: "Tus cambios han sido guardados de forma exitosa",
                            type: "success",
                            showConfirmButton: false,
                            timer:2000
                        });
                        $route.reload();
                        $mdDialog.hide();
                    }, function (response) {
                        //console.log(response);
                        SweetAlert.swal({
                            title: "¡Error!",
                            text: response.data.error.message,
                            type: "error",
                            showConfirmButton: false,
                            timer:3000
                        });
                    });
                }

                retrieveUser(user_id);
                
            }])

var roles = [
    {"name": "Administrador"},
    {"name": "Usuario"},
	
];

})();