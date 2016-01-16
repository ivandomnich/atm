(function () {
    'use strict';

    angular
        .module('app.operations')
        .component('operations', {
            bindings: {
                balance: '@'
            },
            controller: function () {
                var vm = this;
                vm.items = ['balance', 'withdrawal'];
                vm.goToScreen = goToScreen;

                function goToScreen(item) {
                    vm.target = item;
                }
            },
            templateUrl: 'components/operations/views/screens.html'
        })
})();