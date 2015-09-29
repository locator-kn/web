module Controller {

    export class ExploreCtrl {

        locations = [];
        query:any = {};
        availableCities = null;
        mainCategoryDefinitions = [];

        availableCitiesFilterList = [];

        selectedCity = {};

        category = {
            main: {},
            sub: {}
        };


        static $inject = ['$state', 'ExploreService', '$scope', '$rootScope', '$location', 'DataService', 'lodash', '$q', '$filter'];

        constructor(private $state, private ExploreService, private $scope, private $rootScope, private $location, private DataService, private lodash, private $q, private $filter) {

            this.query = $location.search();
            this.mainCategoryDefinitions = DataService.mainCategoryDefinitions;

            this.searchLocations(this.query.city, this.query.category);

            this.category.main = this.mainCategoryDefinitions.filter((elem) => {
                return this.query.category === elem.query_name;
            });

            this.DataService.getLocationCities().then(result => {
                this.availableCitiesFilterList = angular.copy(result.data);
                result.data.sort((a, b) => {
                    return a.total <= b.total;
                });
                this.availableCities = result.data;
                if (this.query.city) {
                    result.data.forEach((city) => {
                        if (city.place_id == this.query.city) {
                            this.selectedCity = city;
                        }
                    })
                }
            });

        }

        sortByTotal(array) {
            return array.sort((a, b) => {
                return a.total <= b.total;
            });
        }

        searchLocations(city, category) {
            return this.ExploreService.searchLocations(city, category).then(result => {
                return this.locations = result.data;
            });
        }

        filterDropdown(userInput) {
            return this.$q((resolve, reject) => {
                var resultArr = this.availableCitiesFilterList.filter((elem) => {
                    if (elem.title.toLowerCase().startsWith(userInput.toLowerCase())) {
                        return true;
                    }
                    //if (elem.title.toLowerCase().indexOf(userInput.toLowerCase()) >= 0) {
                    //    return true;
                    //}
                });
                if (resultArr.length) {
                    resolve(this.sortByTotal(resultArr));
                } else {
                    reject([]);
                }
            });

        }

        selectCity(city) {
            if (this.query.city === city.place_id) {
                return;
            }
            this.query.city = city.place_id;
            this.$location.search({city: city.place_id, category: this.query.category});
            this.searchLocations(city.place_id, this.query.category)
        }

        static
            controllerId:string = "ExploreCtrl";
    }
}
