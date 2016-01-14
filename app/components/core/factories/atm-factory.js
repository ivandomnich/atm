(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('AtmService', AtmService);

    function AtmService() {
        AtmService.getBalance = getBalance;

        function getBalance() {
            return 10000.5;
        }

        return AtmService;
    }
})();
