(function () {
    'use strict';

    angular
        .module('app.login')
        .component('keyboard', {
            bindings: {
                model: '='
            },
            controller: function () {
                var vm = this,
                    number;

                vm.setNumber = setNumber;

                function setNumber(event) {
                    if(this.model && this.model.length > 3 || angular.element(event.target).is('ul')) {
                        return;
                    }

                    number = angular.element(event.target).text();
                    this.model = this.model == undefined ? number : this.model + number;
                }
            },
            templateUrl: 'components/login/views/keyboard.html'
        })
})();