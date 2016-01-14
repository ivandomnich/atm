(function () {
    'use strict';

    angular
        .module('app.login')
        .directive('pinCodeInput', pinCodeInput);

    function pinCodeInput() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                pinCodeInputSuccessfulCallback: '&',
                pinCodeInputUnsuccessfulAttemptCallback: '&'
            },
            link: function(scope, element, attrs, ngModel) {
                var validValue = new Date().getFullYear(),
                    len = validValue.toString().length,
                    transformedInput,
                    isValid,
                    counter = 0;

                ngModel.$formatters.push(function(value) {
                    if(value && value.length == len) {
                        validateField(value);
                    }

                    return value;
                });

                ngModel.$parsers.push(function (modelValue) {
                    if (modelValue.replace) {
                        transformedInput = modelValue.replace(/[^0-9]/g, '');
                        if (transformedInput !== modelValue) {
                            ngModel.$setViewValue(transformedInput);
                            ngModel.$render();
                            return transformedInput;
                        }
                    }

                    if(modelValue.length == len) {
                        validateField(modelValue);
                    }

                    return modelValue;
                });

                function validateField(value) {
                    isValid = value == validValue;

                    ngModel.$setValidity('pinCodeInput', isValid);

                    if(isValid) {
                        scope.pinCodeInputSuccessfulCallback();
                    } else {
                        counter++;
                        if(counter > 3) {
                            scope.pinCodeInputUnsuccessfulAttemptCallback();
                            counter = 0;
                            element.blur();
                        }
                    }
                }
            }
        };
    }
})();