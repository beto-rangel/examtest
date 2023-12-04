var app= angular.module('HelpApp', [
    /* External Dependencies*/
    'ngMaterial',
    'ngMessages',
    'ngRoute',
	'ngResource',
	'validation.match',
	'ui.mask',
    'ngLoadingSpinner',
	'oitozero.ngSweetAlert',
	'satellizer',
    'ngFileUpload',
    'ui.utils.masks',
    'chart.js',
    'md.data.table',
    /* Configuration Modules*/
    'help.configs.module',	
	'data.configs.module',
    
]);


app.controller('indexCtrl', ["$rootScope",  "$scope", 'SweetAlert', '$window', '$timeout','$auth',
        function ($rootScope,  $scope, SweetAlert , $window, $timeout,$auth) {
            $scope.datos = {};
			var URLactual = window.location.href;		
			if (URLactual.indexOf("http://localhost/")==0){
				$scope.quality=true;
			} else if(URLactual.indexOf('http://localhost')==0){
				$scope.quality=true;
			}else if(URLactual.indexOf('http://localhost')==0){
				$scope.quality=true;
			}else {  
				$scope.quality=false;
			} 
            $scope.logIn = function (datos) {
				
            $auth.login({
                //email: datos.email,
                //password: datos.password,
                phone: datos.phone
            })
                .then(function(response){
                    // Si se ha logueado correctamente, lo tratamos aquí.
                    // Podemos también redirigirle a una ruta
                    localStorage.setItem('emailCurrent', datos.email);
				
				    var user = JSON.stringify(response.data.Usuario);
                    localStorage.setItem('usuarioHF', user);
                    localStorage.setItem('idUsCur', response.data.Usuario.id);
                    localStorage.setItem('roleUsCur', response.data.Usuario.role);
                    localStorage.setItem('statusUsCur', response.data.Usuario.status);
                    localStorage.setItem('token', response.data.token);
                //console.log(response.data.Usuario);
                
                $auth.setToken(response.data.token);
                
                    if (response.data.Usuario.status== "Inactivo")
                    {
                        swal({
                        title: "¡Usuario inactivo!",
                        text: "No puedes iniciar sesión con un usuario inactivo",
                        type: "error",
                        timer: 3000,
                        showConfirmButton: false });
                    }
                   else
                   {
                       swal({
                        title: "¡Bienvenido!",
                        text: "En un momento serás redirigido al sistema",
                        type: "success",
                        showConfirmButton: false });
                        $timeout(function () {
                        $window.location.href = 'app/#/reservas';
                    }, 3000);
                   }             
                    
                })
                .catch(function(response){
                    //console.log(response);
                    swal({
                        title: "¡Error de Login!",
                        type: "error",
                        text: "Revisa tus datos de ingreso y vuelve a intentar",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    // Si ha habido errores llegamos a esta parte
                });


            };

            $scope.forgotPwd = function (datos) {

                $auth.login({
                        email: datos.email,
                        password: datos.password
                })
                    .then(function(response){
                            // Si se ha logueado correctamente, lo tratamos aquí.
                            // Podemos también redirigirle a una ruta
                        ////console.log('Entre Login1');
                            localStorage.setItem('emailCurrent', 'Algo');
                        ////console.log('Entre Login2');
                            //console.log(localStorage.getItem('emailCurrent'));
                            $auth.setToken(response.data.token);

                            swal({
                                    title: "¡Bienvenido!",
                                    text: "En un momento serás redirigido al sistema",
                                    type: "success",
                                    showConfirmButton: false });
                            $timeout(function () {
                                    $window.location.href = 'app/';
                            }, 3000);
                    })
                    .catch(function(response){
                            //console.log(response);
                            swal({
                                    title: "¡Error de Login!",
                                    type: "error",
                                    text: "Revisa tus datos de ingreso y vuelve a intentar",
                                    timer: 2000,
                                    showConfirmButton: false
                            });
                            // Si ha habido errores llegamos a esta parte
                    });


                };

        $scope.myDate = new Date();
        $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() ,
        $scope.myDate.getDate());


}]); 

app.config(['$authProvider','$routeProvider','Config', function($authProvider,$routeProvider, Config){
	var url = window.location.href;
	
	var baseURL = Config.BASE_URL;
	//console.log('BaseURL: '+baseURL);
	
    $authProvider.loginUrl = "http://localhost/examtest_back/public/api" + "/login";
    $authProvider.signupUrl = baseURL + "/signup";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "HelpApp";

	$routeProvider
		.when('/',{
				templateUrl: 'login.html'
		})
		.otherwise({
				redirectTo: '/'
		})
		
}]);

app.filter('fecha', function(){
			return function(fecha){
                if (fecha!=undefined){
					fecha=moment(fecha, "YYYY-MM-DD").format("DD/MM/YYYY");
				    return fecha;
                } else {
                    return fecha;
                }
			}
		});



