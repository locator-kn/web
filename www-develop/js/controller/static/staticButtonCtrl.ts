module Controller {
    export class StaticButtonCtrl {

        constructor($scope, private $rootScope) {
            $rootScope.showCreateButton = false;
            $rootScope.showSearchButton = false;
        }

        static controllerId:string = "StaticButtonCtrl";
    }
}
