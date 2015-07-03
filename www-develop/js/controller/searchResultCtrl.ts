module Controller {
    export class SearchResultCtrl {
        results:any;
        animateLoading = true;
        availableMoods:any = [];
        pageCount:number = 1;
        noMoreTrips:boolean = false;


        constructor(private $rootScope, private SearchService, private $state, private DataService) {


            $rootScope.$state = $state;

            $rootScope.$on('loading', () => {
                // fade out current results
                // show loading indicator
                this.animateLoading = true;
            });

            $rootScope.$on('newSearchResults', (scope, result) => {
                // stop loading indicator
                // face in new results
                this.animateLoading = false;
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
            if (this.results == undefined) {
                return;
            }
            this.pageCount += 1;
            this.SearchService.getMoreTrips(this.pageCount)
                .then(result => {
                    if (!result.length) {
                        this.noMoreTrips = true;
                    }
                    result.data.forEach(entry => {
                            this.results.push(entry);
                        }
                    );
                });
        }

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchResultCtrl";
    }
}
