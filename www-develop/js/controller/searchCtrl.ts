module Controller {
    export class SearchCtrl {

        query:any;
        activeItem:string = '';

        constructor(private $scope, private $rootScope, private $location, private SearchService) {
            this.query = $location.search();
            this.query.accomodations = [];

            this.$rootScope.$emit('loading');

            console.log(this.query);
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

            setTimeout(() => {
                this.search();
            }, 1000)

        }

        updateUrl() {
            this.$location.search(this.query);
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
            console.info('yoo');

            if(!this.isAccomodationSelected(accomodation)){
                this.query.accomodations.push(accomodation);
            } else {
                this.query.accomodations.splice(this.query.accomodations.indexOf(accomodation), 1);
            }
        }

        isAccomodationSelected(accomodation){
            console.info(this.query.accomodations.indexOf(accomodation) > -1);
            console.info(this.query.accomodations);
            return this.query.accomodations.indexOf(accomodation) > -1;
        }

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchCtrl";
    }
}
