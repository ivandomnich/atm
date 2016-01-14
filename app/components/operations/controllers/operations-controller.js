(function() {
    'use strict';

    angular
        .module('app.operations')
        .controller('OperationsController', ['AtmService', OperationsController]);

    function OperationsController(atmService) {
        var vm = this;
        vm.balance = atmService.getBalance();
    }
})();
