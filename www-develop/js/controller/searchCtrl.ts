module Controller {
    export class SearchCtrl {

        query:any;
        activeItem:string = '';

        constructor(private $scope, private $rootScope, private $location, private SearchService, private DataService) {
            this.query = $location.search();
            this.query.accomodations = [];
            $rootScope.showSearch = true;
            $rootScope.showCreateButton = false;

            this.$rootScope.$emit('loading');

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

        toggleAccomodationSelection(accomodation) {
            if(!this.isAccomodationSelected(accomodation)){
                this.query.accomodations.push(accomodation);
            } else {
                this.query.accomodations.splice(this.query.accomodations.indexOf(accomodation), 1);
            }
        }

        isAccomodationSelected(accomodation){
            return this.query.accomodations.indexOf(accomodation) > -1;
        }

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchCtrl";
    }
}
