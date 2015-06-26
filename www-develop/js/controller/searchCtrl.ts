module Controller {
    export class SearchCtrl {

        query:any = {};
        activeItem:string = '';
        moods:any = [];
        cities:any = [];
        days:any = [];
        dataAvailable = false;

        showCities:string = 'showCitiesCreate';
        showMoods:string = 'showMoodsCreate';
        showDays:string = 'showDaysCreate';

        selectedCity:any = '';
        selectedMood:any = '';
        selectedDay:any = '';

        constructor(private HelperService, private $scope, private $rootScope, private $location,
                    private SearchService, private DataService, private $state, private UserService, private $q) {

            this.query = $location.search();
            this.query.accommodation = false;

            this.$rootScope.$emit('loading');


            var moods = this.DataService.getMoods();
            var cities = this.DataService.getCities();
            var days = this.DataService.getAvailableAmountOfDays();

            this.$q.all([moods, cities, days])
                .then((responsesArray) => {

                    this.moods = responsesArray[0].data;
                    this.cities = responsesArray[1].data;
                    this.days = responsesArray[2].data;
                    this.dataAvailable = true;

                    this.selectedMood = HelperService.getObjectByQueryName(this.moods, $state.params.moods) || this.moods[Math.floor((Math.random() * this.moods.length))];
                    this.selectedCity= HelperService.getCityByTitle(this.cities, $state.params.city) || this.cities[Math.floor((Math.random() * this.cities.length))];
                    this.selectedDay = HelperService.getObjectByQueryName(this.days, $state.params.days) || this.days[Math.floor((Math.random() * this.days.length))];
                    this.updateUrl();
                });

            //watch the query variable and fire updateUrl() on change
            this.$scope.$watchCollection(angular.bind(this, (query) => {
                return this.query;
            }), () => {
                this.updateUrl();
            });

            this.$scope.$watchCollection(angular.bind(this, (selectedCity) => {
                return this.selectedCity;
            }), (newVal, oldVal) => {
                if (newVal != oldVal) {
                    this.query.city = this.selectedCity.query_name;
                }
            });
            this.$scope.$watchCollection(angular.bind(this, (selectedMood) => {
                return this.selectedMood;
            }), (newVal, oldVal) => {
                if (newVal != oldVal) {
                    this.query.moods = this.selectedMood.query_name;
                }
            });
            this.$scope.$watchCollection(angular.bind(this, (selectedDay) => {
                return this.selectedDay;
            }), (newVal, oldVal) => {
                if (newVal != oldVal) {
                    this.query.days = this.selectedDay.query_name;
                }
            });


        }

        updateUrl() {
            this.$location.search(this.query);
            this.HelperService.saveSearchContext(this.query);
            this.search();
        }

        search() {

            this.$rootScope.$emit('loading');
            if (!this.query.city/* || !this.tripCities.length*/) {
                return;
            }
            this.SearchService.getTripsByQuery(this.query)
                .then(result => {
                    this.emitResult(result.data);
                })
        }

        isActive(item) {
            return item == this.activeItem;
        }

        toggleActiveItem(item) {
            if (item == this.activeItem) {
                this.activeItem = '';
            } else {
                this.activeItem = item;
            }
        }

        focusResult() {
            this.activeItem = '';
        }

        toggleAccomodation() {

            if (typeof this.query.accommodation === "undefined") {
                this.query.accommodation = true;
            } else {
                this.query.accommodation = !this.query.accommodation;
            }

            this.updateUrl();
        }

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }


        static controllerId:string = "SearchCtrl";
    }
}
