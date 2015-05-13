module Controller {
    export class SearchCtrl {

        query:any;
        activeItem:string = '';

        constructor(private $scope, private $rootScope, private $location, private SearchService, private DataService) {
            this.query = $location.search();

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

        toggleAccomodation() {
            if(this.query.accomodation === null) {
                this.query.accomodation = false;
            }
            this.query.accomodation = !this.query.accomodation;
            console.info(this.query.accomodations);
        }

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchCtrl";
    }
}
