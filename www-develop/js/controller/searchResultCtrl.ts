module Controller {
    export class SearchResultCtrl {
        results:any;
        animateLoading = true;
        availableMoods:any = [];
        pageCount:number = 1;
        noMoreTrips:boolean = false;


        // use
        showCities:string = 'showCitiesCreate';
        showMoods:string = 'showMoodsCreate';
        showDays:string = 'showDaysCreate';

        cities:any;
        selectedCity:any;

        days:any;
        selectedDay:any;

        moods:any;
        selectedMood:any;

        dataAvailable:boolean = false;


        constructor(private $scope, private $q, private $rootScope, private SearchService, private HelperService, private $state, private DataService) {


            var moods = this.DataService.getMoods();
            var cities = this.DataService.getCities();
            var days = this.DataService.getAvailableAmountOfDays();

            this.$q.all([moods, cities, days])
                .then((responsesArray) => {

                    this.moods = responsesArray[0].data;
                    this.cities = responsesArray[1].data;
                    this.days = responsesArray[2].data;
                    this.dataAvailable = true;

                    this.selectedMood = HelperService.getObjectByQueryName(this.moods, $state.params.moods);
                    this.selectedCity = HelperService.getCityByTitle(this.cities, $state.params.city);
                    this.selectedDay = HelperService.getObjectByQueryName(this.days, $state.params.days);


                });



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
            console.info(this.results);
        }

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchResultCtrl";
    }
}
