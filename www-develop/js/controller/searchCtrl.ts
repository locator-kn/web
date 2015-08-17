module Controller {
    export class SearchCtrl {

        query:any = {};
        activeItem:string = '';
        moods:any = [];
        cities:any = [];
        days:any = [];
        dataAvailable = false;

        lastScrollTop = 0;
        hideBar:boolean = false;

        showCities:string = 'showCitiesCreate';
        showMoods:string = 'showMoodsCreate';
        showDays:string = 'showDaysCreate';

        selectedCity:any = '';
        selectedMood:any = '';
        selectedDay:any = '';
        scrollevent:any;

        debouncedGetTripsByQuery:any;

        localStorageAvailable:boolean;

        static $inject = ['UtilityService', 'HelperService', '$scope', '$rootScope', '$location', 'SearchService', 'DataService', '$state', '$q'];
        constructor(private UtilityService, private HelperService, private $scope, private $rootScope, private $location,
                    private SearchService, private DataService, private $state, private $q) {



            this.$rootScope.breadcrumb = 'Suchergebnisse';
            this.$scope.$emit('updateTitle', 'Suchergebnisse');

            this.$scope.$emit('updateOgElements', {
                title: 'Suchergebnisse',
                description: '',
                url: window.location.href,
                image: ''
            });

            this.localStorageAvailable = this.HelperService.lsAvailable();

            this.query = $location.search();
            this.query.accommodation = false;

            this.$rootScope.$emit('loading');

            this.debouncedGetTripsByQuery = this.UtilityService.debounce(this.getTripsByQuery, 200, false);
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
                    this.selectedCity = HelperService.getCityByTitle(this.cities, $state.params.city) || this.cities[0];
                    this.selectedDay = HelperService.getObjectByQueryName(this.days, $state.params.days) || this.days[Math.floor((Math.random() * this.days.length))];
                    this.query.city = this.selectedCity.title;
                    this.updateUrl();
                });


            //just do this on xs
            if (angular.element(document).width() > 767) {
                this.scrollevent = this.UtilityService.softDebounce(this.checkScrollDirection, 250, true);
                $(window).scroll(() => {
                    this.scrollevent();
                });
            }


            //watch the query variable and fire updateUrl() on change
            this.$scope.$watchCollection(angular.bind(this, (query) => {
                return this.query;
            }), () => {
                if (this.query.start_date && !this.query.end_date) {
                    this.query.end_date = this.query.start_date;
                }
                this.updateUrl();
            });

            this.$scope.$watchCollection(angular.bind(this, (selectedCity) => {
                return this.selectedCity;
            }), (newVal, oldVal) => {
                if (newVal != oldVal) {
                    this.query.city = this.selectedCity.title;
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

        checkScrollDirection() {

            var st = $(window).scrollTop();

            if (st < 200) {
                this.hideBar = false;
            } else if (st > this.lastScrollTop) {
                this.hideBar = true;
                this.activeItem = '';
            } else {
                this.hideBar = false;
            }
            this.lastScrollTop = st;
            this.$scope.$apply();
        }

        updateUrl() {
            this.$location.search(this.query);
            if(this.localStorageAvailable) {
                this.HelperService.saveSearchContext(this.query);
            }
            this.search();
        }

        search() {
            this.debouncedGetTripsByQuery();
        }

        getTripsByQuery() {
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
                this.hideBar = true;
            } else {
                this.hideBar = false;
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
