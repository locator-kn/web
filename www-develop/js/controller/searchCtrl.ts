module Controller {
    export class SearchCtrl {

        query:any;
        activeItem:string = '';
        selectableMoods;
        selectedMoods = [];
        showSelectableMoods = false;

        constructor(private $scope, private $rootScope, private $location, private SearchService, private DataService) {
            this.query = $location.search();
<<<<<<< HEAD
            this.query.accomodations = [];
            $rootScope.hideSearchButton = true;
            $rootScope.hideCreateButton = false;
=======
            this.query.accomodation = false;
            this.query.moods = [];
>>>>>>> acf979e47e42fad5a1b15c91c51fcf939a47f4ce

            this.$rootScope.$emit('loading');

            this.DataService.getMoods()
                .then(result => {
                    this.selectableMoods = result.data;
                });

            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.city;
            }), () => {
                this.updateUrl()
            });

            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.dateFrom;
            }), () => {
                this.updateUrl()
            });

            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.dateTo;
            }), () => {
                this.updateUrl()
            });

            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.range;
            }), () => {
                this.updateUrl()
            });

            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.persons;
            }), () => {
                this.updateUrl()
            });

            this.$scope.$watch(angular.bind(this, (query) => {
                return this.query.budget;
            }), () => {
                this.updateUrl()
            });

            setTimeout(() => {
                this.search();
            }, 1000)

        }

        updateUrl() {
            this.$location.search(this.query);
            this.search();
        }

        search() {
            this.$rootScope.$emit('loading');
            this.SearchService.getAllTrips()
                .then(result => {
                    this.emitResult(result.data);
                })
        }

        isActive(item) {
            return item == this.activeItem;
        }

        toggleAccomodation() {
            this.query.accomodation = !this.query.accomodation;
            console.info(this.query.accomodations);
        }

        selectMood(mood) {
            this.selectedMoods.push(mood);
            this.query.moods.push(mood.query_name);
            this.selectableMoods.splice(this.selectableMoods.indexOf(mood),1);
            console.info(this.selectableMoods);
        }

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchCtrl";
    }
}
