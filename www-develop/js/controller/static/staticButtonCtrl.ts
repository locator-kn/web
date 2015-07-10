module Controller {
    export class StaticButtonCtrl {

        static $inject = ['$rootScope', '$state', 'HelperService'];
        constructor(private $rootScope, private $state, private HelperService) {
            $rootScope.showCreateButton = false;
            $rootScope.showSearchButton = false;
        }

        searchWithContext(){
            this.$state.go('search', this.HelperService.getSearchContext());
        }

        static controllerId:string = "StaticButtonCtrl";
    }
}
