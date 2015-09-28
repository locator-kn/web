module Controller {

    export class ExploreCtrl {

        locations = [];
        cityId = '';
        category = '';
        query:any = {};
        availableCities = null;
        mainCategoryDefinitions = [];

        selectedCity = null;


        static $inject = ['$state', 'ExploreService', '$scope', '$rootScope', '$location', 'DataService', 'lodash', '$q', '$filter'];

        constructor(private $state, private ExploreService, private $scope, private $rootScope, private $location, private DataService, private lodash, private $q, private $filter) {

            this.query = $location.search();
            this.cityId = this.$state.params.cityId;
            this.category = this.$state.params.category;
            this.mainCategoryDefinitions = DataService.mainCategoryDefinitions;

            this.ExploreService.searchLocations(this.cityId, this.category).then(result => {
                this.locations = result.data;
            });

            this.DataService.getLocationCities().then(result => {
                this.availableCities = result.data;
            });

        }

        filterDropdown(userInput) {
            return this.$q((resolve, reject) => {
                var resultArr = this.availableCities.filter((elem) => {
                    if (elem.title.toLowerCase().indexOf(userInput.toLowerCase()) >= 0) {
                        return true;
                    }
                });
                if (resultArr.length) {
                    resolve(resultArr);
                } else {
                    reject([]);
                }
            });

        }

        selectCity(city) {
            debugger
        }

        static
            controllerId:string = "ExploreCtrl";
    }
}
