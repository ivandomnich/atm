(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', ['$location', '$timeout', 'tmhDynamicLocale', '$translate', LoginController]);

    function LoginController($location, $timeout, tmhDynamicLocale, $translate) {
        var vm = this;
        vm.lang = 'en';

        vm.freezeActions = freezeActions;
        vm.goToOperations = goToOperations;
        vm.switchLanguage = switchLanguage;

        function freezeActions() {
            vm.freeze = true;
            $timeout(function() {
                vm.freeze = false;
            }, 5000);
        }

        function goToOperations() {
            $location.path('operations');
        }

        function switchLanguage(lang) {
            vm.lang = lang;
            tmhDynamicLocale.set(lang);
            $translate.use(lang);
        }
    }
})();
