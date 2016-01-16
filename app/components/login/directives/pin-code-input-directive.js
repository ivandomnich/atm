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
                    transformedInputValue,
                    reg = /^\d+$/,
                    isValid,
                    counterCounter = 0;

                ngModel.$formatters.push(function(value) {
                    if(value && value.length === len) {
                        validateField(value);
                    }

                    return value;
                });

                ngModel.$parsers.push(function (modelValue) {
                    transformedInputValue = modelValue ? modelValue.toString().match(reg)[0] : '';

                    if(transformedInputValue != null) {
                        ngModel.$setViewValue(transformedInputValue);
                        ngModel.$render();

                        if(transformedInputValue.length === len) {
                            validateField(modelValue);
                        }

                        return transformedInputValue;
                    }

                    ngModel.$setViewValue('');
                    ngModel.$render();
                    return modelValue;
                });

                function validateField(value) {
                    isValid = value == validValue;

                    ngModel.$setValidity('pinCodeInput', isValid);

                    if(isValid) {
                        scope.pinCodeInputSuccessfulCallback();
                    } else {
                        counterCounter++;
                        if(counterCounter > 3) {
                            scope.pinCodeInputUnsuccessfulAttemptCallback();
                            counterCounter = 0;
                            resetInput();
                        }
                    }
                }

                function resetInput() {
                    ngModel.$setViewValue('');
                    ngModel.$render();
                    ngModel.$setValidity('pinCodeInput', true);
                    element.blur();
                    element.val('');
                }
            }
        };
    }
})();