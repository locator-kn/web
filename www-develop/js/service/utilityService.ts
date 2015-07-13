module Service {
    export class UtilityService {

        static $inject = ['ngDialog'];

        constructor(private ngDialog) {
        }


        // Returns a function, that, as long as it continues to be invoked, will not
        // be triggered. The function will be called after it stops being called for
        // N milliseconds. If `immediate` is passed, trigger the function on the
        // leading edge, instead of the trailing.
        // Borrowed from: http://davidwalsh.name/javascript-debounce-function
        debounce(func:any, wait:number, immediate:boolean) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        softDebounce(func:any, wait:number, immediate:boolean) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                if (!timeout) timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        errorMsg(title, msg) {
            var modal = this.ngDialog.open({
                controller: ($scope) => {
                    $scope.close = () => {
                        modal.close();
                    }
                },
                template: '<h3>' + title + '</h3>' +
                '<p>' + msg + '</p>' +
                '<a class="pointer" ng-click="close()">Ok</a>',
                plain: true
            });
        }

        genericMsg(title, msg, buttonTitle, buttonFunction) {

            var modal = this.ngDialog.open({
                controller: ($scope) => {

                    $scope.ttle = title;
                    $scope.msg = msg;
                    $scope.buttonTitle = buttonTitle;
                    $scope.buttonFunction = buttonFunction;

                    $scope.close = () => {
                        modal.close();
                    }
                },
                template: "/templates/modal/genericMessage.html",
                overlay: false
            });

        }


        static serviceId:string = "UtilityService";
    }
}


