module Controller {
    export class SearchCtrl {
        query:any;
        constructor(private $scope, private $location, private SearchService) {
            this.query = $location.search();

            this.search();

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

        }

        updateUrl() {
            this.$location.search(this.query);
        }

        search() {
            this.$scope.$emit('loading');
            this.SearchService.getAllTrips()
                .then(result => {
                    this.emitResult(result.data);
                })
        }

        emitResult(result) {
            this.$scope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchCtrl";
    }
}
