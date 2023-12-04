(function () {
    "use strict";
    angular.module('help.configs.module', [])

	 .config(['$mdThemingProvider', function ($mdThemingProvider) {

            //dark-blue
            $mdThemingProvider.definePalette('blue', {
              '50': '080707',
			  '100': '080707',
			  '200': '080707',
			  '300': '080707',
			  '400': '080707',
			  '500': '080707',
			  '600': '080707',
			  '700': '080707',
			  '800': '080707',
			  '900': '080707',
			  'A100': '080707',
			  'A200': '080707',
			  'A400': '080707',
			  'A700': '080707',
			  'contrastDefaultColor': 'light',
			  'contrastDarkColors': [
				'50',
				'100',
				'200',
				'300',
				'400',
				'A100',
				'A200',
				'A400',
				'A700'
			  ],
			  'contrastLightColors': [
				'500',
				'600',
				'700',
				'800',
				'900'
			  ]
            });
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('teal')
                .warnPalette('amber')
				.backgroundPalette('grey');
				
			 $mdThemingProvider.theme('dark', 'default')
				  .primaryPalette('light-green')
				  .dark();	
        }])

	 /**
	  * Config Constant
	  *  SERVER_TEST_DEVICE: Temporary URL generated by Vagrant. Ej. terrible-parakeet-4069
	  *  SERVER_TEST_LOCAL: Server URL.
	  *  CURRENT_SERVER_TYPE: local | device.
	  */
		.constant("Config", (function () {
			var URLactual = window.location.href;
		var CURRENT_SERVER_TYPE = "testing";

		var BASE_URL_TEST="http://localhost/examtest_back/public";
		var BASE_URL_PRODUCTION="http://localhost/examtest_back/public";
		var BASE_URL_DEMO="http://localhost/examtest_back/public";

		var SERVER_URL_UPLOAD_TEST = BASE_URL_TEST + "/v1/archivos/storage/create";
		var SERVER_URL_UPLOAD_PRODUCTION = BASE_URL_PRODUCTION + "/v1/archivos/storage/create";
		var SERVER_URL_UPLOAD_DEMO = BASE_URL_DEMO + "/v1/archivos/storage/create";
		var SERVER_URL_DOWNLOAD_TEST = BASE_URL_TEST + "/descarga/storage";
		var SERVER_URL_DOWNLOAD_PRODUCTION = BASE_URL_PRODUCTION + "/descarga/storage";
		var SERVER_URL_DOWNLOAD_DEMO = BASE_URL_DEMO + "/descarga/storage";
		var SERVER_TEST = BASE_URL_TEST + "/v1";
		var SERVER_PRODUCTION = BASE_URL_PRODUCTION + "/v1";
		var SERVER_DEMO = BASE_URL_DEMO + "/v1";
		//console.log('URLActual: ' +URLactual);
		//console.log(URLactual);
		
		if (URLactual.indexOf("http://localhost/")==0){
			CURRENT_SERVER_TYPE = "testing";
			//console.log('Pruebas Local');
		} else if(URLactual.indexOf('http://localhost')==0){
			CURRENT_SERVER_TYPE = "testing";
			//console.log('Pruebas Server');
		}else if(URLactual.indexOf('http://localhost')==0){
			CURRENT_SERVER_TYPE = "demo";
			//console.log('Pruebas Demo');
		}else if(URLactual.indexOf('http://localhost')==0){
			CURRENT_SERVER_TYPE = "production";
			//console.log('Producción');
		} 
			var url = ( CURRENT_SERVER_TYPE === 'testing') ? SERVER_TEST : ( CURRENT_SERVER_TYPE === 'demo') ? SERVER_DEMO : SERVER_PRODUCTION;
			var baseurl = ( CURRENT_SERVER_TYPE === 'testing') ? BASE_URL_TEST : ( CURRENT_SERVER_TYPE === 'demo') ? BASE_URL_DEMO : BASE_URL_PRODUCTION;
			var urlUp = ( CURRENT_SERVER_TYPE === 'testing') ? SERVER_URL_UPLOAD_TEST : ( CURRENT_SERVER_TYPE === 'demo') ? SERVER_URL_UPLOAD_DEMO : SERVER_URL_UPLOAD_PRODUCTION;
			var urDown = ( CURRENT_SERVER_TYPE === 'testing') ? SERVER_URL_DOWNLOAD_TEST : ( CURRENT_SERVER_TYPE === 'demo') ? SERVER_URL_DOWNLOAD_DEMO : SERVER_URL_DOWNLOAD_PRODUCTION;
			////console.log(CURRENT_SERVER_TYPE);
			//console.log(CURRENT_SERVER_TYPE);
			//console.log('ApiUrl'+url);

			return {
                "SERVER_URL": url,
				"BASE_URL": baseurl,
				"SERVER_URL_UPLOAD": urlUp,
				"SERVER_URL_DOWNLOAD": urDown
			}
		})());
    
        

})();