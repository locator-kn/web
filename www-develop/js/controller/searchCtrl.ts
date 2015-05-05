module Controller {
    export class SearchCtrl {
        query:any;
        constructor(private $scope, private $rootScope, private $location, private SearchService) {
            this.query = $location.search();



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

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchCtrl";
    }
}
