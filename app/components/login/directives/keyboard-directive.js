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
                    number,
                    isListClicked,
                    target;

                vm.setNumber = setNumber;

                function setNumber(event) {
                    target = angular.element(event.target);
                    isListClicked = event.target === event.currentTarget;

                    if(this.model && this.model.length > 3 || isListClicked) {
                        return;
                    }

                    number = target.attr('data-title');
                    this.model = this.model == undefined ? number : this.model + number;
                }
            },
            templateUrl: 'components/login/views/keyboard.html'
        })
})();