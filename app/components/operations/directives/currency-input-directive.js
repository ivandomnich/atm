(function () {
    'use strict';

    angular
        .module('app.operations')
        .directive('currencyInput', currencyInput);

    currencyInput.$inject = ['$filter'];
    function currencyInput($filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {},
            link: function (scope, element, attrs, ngModel) {
                var transformedInput,
                    currency = $filter('currency'),
                    reg = /\d+\.{0,1}\d{0,2}/g;
//                    reg = /(\d+(\.\d{2})?)/;

                ngModel.$parsers.push(function (modelValue) {
                    transformedInput = modelValue.toString().match(reg);

                    if(transformedInput == null) {
                        ngModel.$setViewValue('');
                        ngModel.$render();
                        return modelValue;
                    } else {
                        ngModel.$setViewValue(transformedInput[0]);
                        ngModel.$render();
                        return transformedInput[0];
                    }

                    return modelValue;
                });

                element.on('blur', function () {

                    console.log(ngModel)

                    element.val($filter('currency')(ngModel.$modelValue));
                });

                element.on('focus', function () {
                    element.val(ngModel.$modelValue);
                });
            }
        };
    }
})();