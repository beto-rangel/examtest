var app = angular.module('HelpApp', [
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

	/* Application Modules */
	'help.header.module',
	'help.users.module'
]);

app.config(['$authProvider','$routeProvider', 'Config', function($authProvider,$routeProvider, Config){
	var url = window.location.href;
	
	var baseURL = Config.BASE_URL;
	
	$authProvider.loginUrl = baseURL + "/auth/login";
	$authProvider.signupUrl = baseURL + "/auth/signup";
	$authProvider.tokenName = "token";
	$authProvider.tokenPrefix = "HelpApp";
        
	$routeProvider
		.when('/roles',{
				templateUrl: 'templates/users/users.html',
				controller: 'UsersReadController',
				controllerAs: 'userCtrl'
		})
		
		.otherwise({
				redirectTo: '/roles'
		})
		
		
}]);

app.filter('phonefilter', function(){
			return function(numero){
        if (numero!=undefined){
					numero= numero.replace(/\s/g,"");
					numero= numero.replace(/\W/g, "");
					if(numero.length==10){
					
						if(numero.substring(0,2)==='55'){
								return "(" + numero.substring(0,2) + ") " + numero.substring(2,6) + " " + numero.substring(6);
						}else{

								return "(" + numero.substring(0,3) + ") " + numero.substring(3,6) + " " + numero.substring(6);
						}
					} else if (numero!=undefined && numero.length==8){
						numero= numero.replace(/\W/g, "");
											return numero.substring(0,4) + " " + numero.substring(4);
					} else {
											return numero;
					}
				}
			}
		});
app.filter('rfc', function(){
			return function(rfc){
                if (rfc!=undefined && rfc.length==13){
				return rfc.substring(0,4) + "-" + rfc.substring(4,10) + "-" + rfc.substring(10);
                } else if (rfc!=undefined ){
                   return rfc.substring(0,3) + "-" + rfc.substring(3,9) + "-" + rfc.substring(9); 
                }
			}
		});

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

app.filter('fecha_ventanilla', function(){
			return function(fecha){
                if (fecha!=undefined){
					fecha=moment(fecha, "DD-MM-YYYY").format("DD/MM/YYYY");
				    return fecha;
                } else {
                    return fecha;
                }
			}
		});

app.filter('curp', function(){
			return function(curp){  
                if (curp!=undefined){
				return curp.substring(0,4) + "-" + curp.substring(4,10) + "-" + curp.substring(10);     
                }
			}
		});

app.filter('saltosLinea', function(){
			return function(texto){  
                if (texto!=undefined){
				return texto.replace(/\n/g, '<br/>');     
                }
			}
		});

app.filter('humanize', function(){
			return function(fecha){  
                if (fecha !=undefined){
				fecha=moment(fecha, "DD-MM-YYYY").toDate();                
				return moment(fecha).toNow(true); 
                }
			}
		});

app.filter('clabe', function(){
			return function(clabe){
                if (clabe!=undefined){
				return clabe.substring(0,4) + "-" + clabe.substring(4,8) + "-" + clabe.substring(8,12) + "-" + clabe.substring(12);
                }
			}
		});

app.filter('fechahoraBD', function(){
	return function(dato){
		if (dato !=undefined){
			var fecha = dato.split(' ')[0];
			var hora = dato.split(' ')[1];
			fecha = moment(fecha, "YYYY-MM-DD").format("DD MMMM YYYY");
			hora = moment(hora, "HH:mm:ss").format("HH:mm");
			return fecha + ' '+ hora;
		}
		
	}
});
app.filter('dateDB', function(){
	return function(dato){
		if (dato !=undefined){
			var fecha = dato.split(' ')[0];
			var hora = dato.split(' ')[1];
			fecha = moment(fecha, "YYYY-MM-DD").format("DD MMM YY");
			hora = moment(hora, "HH:mm:ss").format("HH:mm");
			return fecha ;
		}
		
	}
});
app.filter('dateUntil', function(){
	return function(dato){
		if (dato !=undefined){
			var fecha = moment(dato,"YYYY-MM-DD HH:mm:ss").fromNow();
			return fecha ;
		}
		
	}
});
app.filter('dateDBLead', function(){
	return function(dato){
		if (dato !=undefined){
			var fecha = dato.split(' - ')[0];
			var hora = dato.split(' - ')[1];
			fecha = moment(fecha, "DD-MM-YYYY").format("DD MMM YY");
			hora = moment(hora, "HH:mm").format("HH:mm");
			return fecha + ' '+ hora;
		}
		
	}
});
app.filter('dateUntilLead', function(){
	return function(dato){
		if (dato !=undefined){
			var fecha = moment(dato,"DD-MM-YYYY[' - ]HH:mm").fromNow();
			return fecha ;
		}
		
	}
});
app.filter('dateCourseByDay', function(){
	return function(fecha){
		if (fecha !=undefined){
			var fecha = moment(fecha, "YYYY-MM-DD").format("DD");
			return fecha;
		}
		
	}
});
app.filter('dateCourseByMonth', function(){
	return function(fecha){
		if (fecha !=undefined){
			var fecha = fecha.split()[0];
			var fecha = moment(fecha, "YYYY-MM-DD").format("MMMM");
			$letras = (fecha[0]+fecha[1]+fecha[2]).toUpperCase();
			return $letras;
		}
		
	}
});
app.filter('eventoNombre', function(){
	return function(dato){
		if (dato !=undefined&&dato !=null){
			return dato.split('_')[0];
		}
		}
});
app.filter('eventoCategoria', function(){
	return function(dato){
		if (dato !=undefined&&dato !=null){
		return dato.split('_')[1]
		}
		
	}
});
app.filter('pagination', function(){
	return function(input, start)	{
		if (!input || !input.length) { return; }
		start = +start;
		return input.slice(start);
	};
	
});
