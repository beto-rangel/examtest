
 (function () {
    "use strict";
    angular.module('HelpApp')
        .controller('MainCtrl', ['$rootScope', '$scope', '$mdSidenav', '$location', 'SweetAlert', '$timeout','$auth','$route','$window', 'Data', 'Users', 
            function ($rootScope, $scope, $mdSidenav, $location, SweetAlert, $timeout,$auth,$route,$window,Data, Users) {
				var vm = this;
				vm.sideNav=Data.sideNav;
			
			var URLactual = window.location.href;		
			if (URLactual.indexOf("http://localhost/")==0){
				$scope.quality=true;
			} else if(URLactual.indexOf('http://dev.helpfirstsystem.com')==0){
				$scope.quality=true;
			}else if(URLactual.indexOf('http://mirror.helpfirstsystem.com')==0){
				$scope.quality=true;
			}else {  
				$scope.quality=false;
			} 
           
			if (!$auth.isAuthenticated()) { 
				swal({
					  title: "¡Tu sesión ha caducado!",
					  text: "Inicia sesión nuevamente, en un momento serás redirigido para iniciar sesión",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "¡OK!",
					  closeOnConfirm: false,
					  closeOnCancel: false
					},
					function(isConfirm){
					  if (isConfirm) {
					  	$window.location.href = '../index.html';
					  } else {
						swal("Cancelado", "No se han hecho cambios :)", "error");
					  }
					}); 
			} 
			
				$scope.Usuario=JSON.parse(localStorage.getItem('usuarioHF'));

				vm.userRole = localStorage.getItem('roleUsCur');

				//FUNCIONES PARA DEFINIR EL TIPO DE USUARIO EN TRUE
		
				$scope.isAD=function (){
						return "Administrador" === vm.userRole;
				}
			
				$scope.isUser=function (){
					return "Usuario" === vm.userRole;
				}
				
				vm.isAD=function (){
						return "Administrador" === vm.userRole;
				}
				vm.isUser=function (){
					return "Usuario" === vm.userRole;
				}

				$scope.goBackSingle = back;
				$scope.toggleSidenav = toogleNavbar;
				$scope.onSwipeLeftMenu = swipeLeftMenu;
				$scope.updateSidebarIsOpen = false;
				$scope.activateMenuItem =  activateMenuItem ;
                
				$scope.closeSN=closeSN;

				function closeSN(sidenav){
						$mdSidenav(sidenav).close();
				}

				function back() {
						window.history.back();
				}

				function toogleNavbar(menuId) {
						$mdSidenav(menuId).toggle();
				}

				function swipeLeftMenu() {
						toogleNavbar('left');
				}
                
				function activateMenuItem(menuItem){
					$scope.mUsuarios ="";				
					
					$scope[menuItem] ='active';
				}
				
				Users.getUsers(function (response) {
                    $rootScope.users = response.items.data;

                }, function (response) {
                    //console.log(response);
                });
				$scope.go = function ( hash ) {
				  $location.path( hash );
				  $mdSidenav('left').close();
				  localStorage.removeItem('notLead');
				};
				$scope.printThis = function printThis(){
						$timeout(function () {
								window.print();
						}, 1000);
				}
				
				var snd = new Audio("alert.wav"); // buffers automatically when created 
				
							
	}])
    
.controller('HomeCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

        }])

.controller("loginController", ["$rootScope",  "$scope", 'SweetAlert', '$window', '$location', '$timeout', '$auth',
            function ($rootScope,  $scope, SweetAlert , $window, $location, $timeout, $auth) {
			var vm = this;

			vm.logOut = closeSession;
			
                function closeSession() {
                    SweetAlert.swal({
                            title: "¿Deseas cerrar sesión?",
                            text: " ",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55", confirmButtonText: "Si, ¡hasta pronto!",
                            cancelButtonText: "No, ¡seguiré trabajando!",
                            closeOnConfirm: false,
                            closeOnCancel: true
                        },
                        function (isConfirm) {
                            if (isConfirm) {

                        SweetAlert.swal({   
                            title: "¡Hasta Pronto!",   
                            text: "Serás redirigido a la pantalla principal",   
                            type: "success",   
                            showConfirmButton: false }
                    );
                    $timeout(function () {
                    if (!$auth.isAuthenticated()) {
                    $window.location.href = '../';
                    }
                    $auth.logout().then(function () {
                    //localStorage.clear();
                    $window.location.href = '../';

                    });


                                        }, 2500);
                               
                            } else {
                               
                            }
                        });
                }
	
        }])
        .controller("SidebarFormController", ["$mdSidenav", function ($mdSidenav) {
            var vm = this;
            vm.openFormSidebar = openRightSidebar;
            vm.isOpen = IsOpenSidebarForm;
            function IsOpenSidebarForm(navID) {
                return $mdSidenav(navID).isOpen();
            }

            function openRightSidebar(navID) {
                $mdSidenav(navID).toggle();
            }
        }])
    .config(function($mdDateLocaleProvider) {

    // Language
    $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
    $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

        
        $mdDateLocaleProvider.formatDate = function(date) {
          return date ? moment(date).format('DD/MM/YYYY') : null;
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
          var m = moment(dateString, 'DD/MM/YYYY', true);
          return m.isValid() ? m.toDate() : new Date(NaN);
        };


    $mdDateLocaleProvider.msgCalendar = 'Calendario';
    $mdDateLocaleProvider.msgOpenCalendar = 'Abrir el Calendario';

    // You can also set when your calendar begins and ends.
    $mdDateLocaleProvider.firstRenderableDate = new Date(1920, 1, 1);
    $mdDateLocaleProvider.lastRenderableDate = new Date(2050, 1, 1);
});

})();
