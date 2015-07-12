module Controller {
    export class SearchResultCtrl {
        results:any;
        availableMoods:any = [];
        pageCount:number = 1;
        noMoreTrips:boolean = false;

        dataLoading:boolean = true;

        static $inject = ['$rootScope', 'SearchService', '$state', 'DataService'];
        constructor(private $rootScope, private SearchService, private $state, private DataService) {

            $rootScope.$state = $state;

            $rootScope.$on('loading', () => {
                // fade out current results
                // show loading indicator
                this.dataLoading = true;
            });

            $rootScope.$on('newSearchResults', (scope, result) => {
                // stop loading indicator
                // face in new results
                this.dataLoading = false;
                this.results = result;
            });

            this.DataService.getMoods().then(result => {
                this.availableMoods = result.data;
            });
        }

        search() {
            this.$rootScope.$emit('loading');
            this.SearchService.getAllTrips()
                .then(result => {
                    this.emitResult(result.data);
                })
        }

        loadMorePages() {
            if (this.results == undefined || this.dataLoading) {
                return;
            }

            this.dataLoading = true
            this.pageCount += 1;
            this.SearchService.getMoreTrips(this.pageCount)
                .then(result => {
                    if (!result.data.length || result.data.length < 10) {
                        this.noMoreTrips = true;
                    }
                    result.data.forEach(entry => {
                            this.results.push(entry);
                        }
                    );
                    this.dataLoading = false;
                });
        }

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchResultCtrl";
    }
}
