(function () {
    'use strict';

    angular
        .module('app', [
            'tmh.dynamicLocale',
            'pascalprecht.translate',
            'ngAnimate',
            'app.core',
            'app.login',
            'app.operations',
            'ngNewRouter'
        ])
        .config(['tmhDynamicLocaleProvider', '$translateProvider', '$componentLoaderProvider', config])
        .controller('AppController', ['$router', AppController]);

    function AppController($router) {
        $router.config([
            { path: '/', redirectTo: '/login' },
            { path: '/login', component: 'login' },
            { path: '/operations', component: 'operations' }
        ]);
    }

    function config(tmhDynamicLocaleProvider, $translateProvider, $componentLoaderProvider) {
        $componentLoaderProvider.setTemplateMapping(function (name) {
            var dashName = dashCase(name);
            // customized to use app prefix
            return './components/' + dashName + '/' + 'views' +  '/'  + dashName + '.html';
        });

        function dashCase(str) {
            return str.replace(/([A-Z])/g, function ($1) {
                return '-' + $1.toLowerCase();
            });
        }


        tmhDynamicLocaleProvider.localeLocationPattern('locales/angular-locale_{{locale}}.js');

        //TODO: Need to add separated json files for texts
        $translateProvider.translations('en', {
            'SCREEN_FORE_ENTERING_PIN': "Screen for Entering PIN",
            'CHOOSE_YOUR_LANGUAGE': "Choose your language",
            'CHOOSING_OPERATION_SCREEN': "Choosing Operation Screen",
            'BALANCE': "Balance",
            'WITHDRAWAL': "Withdrawal",
            'YOUR_BALANCE': "Your balance",
            'PLEASE_ENTER_NUMBER': "Please enter number",
            'PLEASE_TRY_AGAIN_IN_5_SECONDS': "Please try again in 5 seconds",
            'OK': "Ok",
            'BACK': "Back",
            'EXIT': "Exit"
        });
        $translateProvider.translations('fr', {
            'SCREEN_FORE_ENTERING_PIN': "L'écran pour la Saisie du code PIN",
            'CHOOSE_YOUR_LANGUAGE': "Choisissez votre langue",
            'CHOOSING_OPERATION_SCREEN': "Choix D'Écran De L'Opération",
            'BALANCE': "Solde",
            'WITHDRAWAL': "Retrait",
            'YOUR_BALANCE': "Votre solde",
            'PLEASE_ENTER_NUMBER': "Veuillez entrer le numéro de",
            'PLEASE_TRY_AGAIN_IN_5_SECONDS': "Merci d'essayer de nouveau dans les 5 secondes",
            'OK': "Ok",
            'BACK': "De retour",
            'EXIT': "Sortie"
        });
        $translateProvider.preferredLanguage('en');
    }

})();