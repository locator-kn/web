module Controller {
    export class SearchResultCtrl {
        result:any;
        constructor(private $scope, private $rootScope, private $location, private SearchService) {
            this.query = $location.search();

            $rootScope.$on('loading', () => {
                console.log('loading')
                this.result = 'loading'
            });

            $rootScope.$on('newSearchResults', (scope, result) => {
                console.log('newSearchResults', arguments);
                this.result = result;
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
