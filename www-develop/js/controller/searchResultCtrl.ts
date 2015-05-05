module Controller {
    export class SearchResultCtrl {
        results:any;
        constructor(private $scope, private $rootScope, private $location, private SearchService) {

            $rootScope.$on('loading', () => {
                console.log('loading');
            });

            $rootScope.$on('newSearchResults', (scope, result) => {
                console.log('newSearchResults', arguments);
                this.results = result;
            });
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

        static controllerId:string = "SearchResultCtrl";
    }
}
