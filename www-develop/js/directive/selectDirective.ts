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

                $scope.remove = function (value) {
                    var i = $scope.selectedModel.indexOf(value);
                    $scope.selectedModel.splice(i, 1);
                };

                //returns true, if the list contains more than one item
                $scope.twoPlus = function () {
                    console.info($scope.selectedModel.length > 1);
                    return $scope.selectedModel.length > 1;
                };


                $scope.select = function (value) {

                    if ($scope.multiple) {

                        if ($.inArray(value, $scope.selectedModel) == -1) {
                            $scope.selectedModel.push(value);
                        }

                    } else {

                        $scope.selectedModel = value;


                    }
                    $scope.trigger();
                };


            },
            link: function ($scope:any) {
                $scope.$watch('selectedModel', function (newValue) {
                    if (newValue && $scope.multiple) {

                        if ($scope.selectedModel instanceof Array) {
                            // !$scope.selectedModel instanceof Array is not working properly, todo.
                        } else {
                            $scope.selectedModel = [$scope.selectedModel];
                        }
                    }
                }, true);
            }

            ,
            template: '<div ng-if="!multiple" class="relative" ng-class="{open: opened}"><a ng-click="trigger()">{{selectedModel.title}}</a><ul class="sub"><li ng-click="select(value)" ng-repeat="value in values">{{value.title}}</li></ul></div>' +
            '<div ng-if="multiple" class="relative" ng-class="{open: opened}"><a ng-repeat="item in selectedModel" class="fullwidth" ng-click="trigger()">{{item.title}}<span ng-if="twoPlus()" class="remove_item" ng-click="remove(value)">X</span></a><ul class="sub"><li ng-click="select(mood)" ng-repeat="mood in values">{{mood.title}}</li></ul></div>'
        }

    }
)
;
