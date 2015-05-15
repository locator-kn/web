angular.module('starter').directive('select', function () {
    return {
        scope: {
            values: '=',
            'selectedModel': '=',
            'multiple': '=',
        },
        controller: function ($scope, hotkeys, $timeout, $rootScope) {

            //handle open/close
            $scope.opened = false;
            $scope.trigger = function () {
                $scope.opened = !$scope.opened;
            };

            if ($scope.multiple) {

                $scope.select = function (value) {

                    $scope.selectedModel.push(value);
                    $scope.trigger();
                }

            } else {

                $scope.select = function (value) {
                    $scope.selectedModel = value;
                    $scope.trigger();
                }
            }
        },
        link: function($scope: any) {
            $scope.$watch('selectedModel', function(newValue) {
                if (newValue && $scope.multiple) {

                    if ($scope.selectedModel instanceof Array) {
                        // !$scope.selectedModel instanceof Array is not working properly, todo.
                    } else {
                        $scope.selectedModel = [$scope.selectedModel];
                    }
                }
            }, true);
        },
        template: '<div ng-if="!multiple" class="relative" ng-class="{open: opened}"><a ng-click="trigger()">{{selectedModel.title}}</a><ul class="sub"><li ng-click="select(mood)" ng-repeat="mood in values">{{mood.title}}</li></ul></div>' +
        '<div ng-if="multiple" class="relative" ng-class="{open: opened}"><a ng-repeat="item in selectedModel" class="fullwidth" ng-click="trigger()">{{item.title}}</a><ul class="sub"><li ng-click="select(mood)" ng-repeat="mood in values">{{mood.title}}</li></ul></div>'
    }

});
