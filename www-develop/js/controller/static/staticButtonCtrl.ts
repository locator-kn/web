module Controller {
    export class StaticButtonCtrl {

        constructor($scope, private $rootScope, private $state, private HelperService) {
            $rootScope.showCreateButton = false;
            $rootScope.showSearchButton = false;
        }

        searchWithContext(){
            this.$state.go('search', this.HelperService.getSearchContext());
        }

        static controllerId:string = "StaticButtonCtrl";
    }
}
