module Controller {

    export class ExploreCtrl {

        locations = [];
        cityId = '';
        category = '';
        query:any = {};
        availableCities;

        static $inject = ['$state', 'ExploreService', '$scope', '$rootScope', '$location', 'DataService'];
        constructor(private $state, private ExploreService, private $scope, private $rootScope, private $location, private DataService) {

            this.query = $location.search();
            this.cityId = this.$state.params.cityId;
            this.category = this.$state.params.category;

            this.ExploreService.searchLocations(this.cityId, this.category).then(result => {
                this.locations = result.data;
            });

            this.DataService.getLocationCities().then(result => {
                this.availableCities = result.data;
            });

        }

        static controllerId:string = "ExploreCtrl";
    }
}
