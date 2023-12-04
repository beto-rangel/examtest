app.controller("newPassCtrl", ["$rootScope" ,"$mdSidenav", "$scope", "$timeout", "SweetAlert", "$route", '$location','$http',"$filter",'Config',
    function ($rootScope,  $mdSidenav, $scope, $timeout, SweetAlert, $route, $location, $http,$filter, Config) {

        var vm = this;
        vm.model = {};

        $scope.queryString = $location.search();
        $scope.token = $scope.queryString.token;
		
		var url= Config.BASE_URL;

        //Petición ajax que se encagra de realizar el cambio de password y envia mensaje si fue exitoso
        //al momento de cambiarlo
        var fd = new FormData();
        fd.append('email', $scope.email);

        //hacemos la petición para el post de la imágen
        $scope.forgotPwd = function(dats){
          //console.log("entre a fun");

          $.ajax({
                url: url+'/auth/password/email',
                type: 'post',
                data: {
                  email: $scope.email
                },
                dataType: 'json',
                success:function(response){
                  console.info(response);
                  switch (parseInt(response.status)) {  
                    // El usuario no existe en la BD
                    case 0:
                          $scope.launchAlert("¡Aviso!", "El Correo no existe en nuestra Base de Datos. Intenta de Nuevo", "error");
                    break;

                    // El usuario existe y se envia correo electrónico
                    case 1:
                          $scope.launchAlert( "¡Aviso!", "Se ha enviado un enlace al Correo Electrónico", "success");
                    break;
                  }

                  $location.path('');
                },error:function(response){
                  $scope.launchAlert("¡Aviso!", "Ocurrió un error. Favor de intentar más tarde", "error");
                }
              }); //END ajax
        }//END forgotPwd()

        // Cuando el usuario manda el password con los datos necesarios
        // regresa la petición de si el correo fue agregado correctamente
        $scope.newPass = function(){
          //console.log("entre a reset pass");
          // peticion ajax para el cambio de password
          console.info();
          $.ajax({
                url: url+'/auth/password/reset',
                type: 'post',
                data: {
                  email: $scope.emailNew,
                  token: $scope.token,
                  password: $scope.passwordNew,
                  password_confirmation: $scope.password_confirmationNew
                },
                dataType: 'json',
                success:function(response){
                  //console.log("Ok");
                  console.info(response);
                  switch (response.data.status) {  
                    // El usuario no existe en la BD
                    case 0:
                         return SweetAlert.swal({
                            title: "¡Error!",
                            text: "Verifica tus datos e intenta de nuevo",
                            type: "error",
                            showConfirmButton: false,
                            timer:3000
                        });
                    break;

                    // El usuario existe y se envia correo electrónico
                    case 1:
                        return SweetAlert.swal({
                            title: "¡Tú Password ha sido cambiado exitosamente!",
                            text: "Cierra esta pestaña y abre nuevamente una en tu navegador para poder ingresar",
                            type: "success",
                            showConfirmButton: false,
                            timer:9000
                        });
                    break;
                  }
                  
                },error:function(response){
                  console.log("Error");
                  console.log(response);
                  $scope.launchAlert("¡Aviso!", "Ocurrió un error. Favor de intentar más tarde", "error");
                }
              }); //END ajax            
        }//END newPass

    // devuelve un Sweet Alert dependiendo del mensaje que uno quiera mostrar
    //con su respectivo texto
    $scope.launchAlert = function(titulo, texto, tipoMensaje){

      titulo = titulo || "¡Aviso!";
      texto = texto || "Error";
      tipoMensaje = tipoMensaje || "info";

      return SweetAlert.swal({
                  title: titulo,
                  text: texto,
                  type: tipoMensaje,
                  showConfirmButton: false,
                  timer:2000
                  });
    }

}]);   

