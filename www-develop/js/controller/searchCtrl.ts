module Controller {
    export class SearchCtrl {

        query:any = {};
        activeItem:string = '';
        selectedMoods = [];
        selectableMoods = [];
        showSelectableMoods = false;
        tripCities = [];

        constructor(private HelperService, private $scope, private $rootScope, private $location, private SearchService, private DataService, private $state, private lodash) {
            this.query = $location.search();
            this.query.accommodation = false;

            $rootScope.showSearchButton = false;
            $rootScope.showCreateButton = true;

            this.$rootScope.$emit('loading');

            this.DataService.getMoods()
                .then(result => {
                    this.selectableMoods = result.data;

                    HelperService.getMoods($state.params.moods, moods => {
                        this.selectedMoods = moods;
                        this.updateUrl();
                    });

                });

            this.DataService.getAvailableCities()
                .then(result => {
                    console.info(result.data);
                    this.tripCities = result.data;
                });

            //watch the query variable and fire updateUrl() on change
            this.$scope.$watchCollection(angular.bind(this, (query) => {
                return this.query;
            }), () => {
                this.updateUrl();
            });

            this.search();

        }

        updateUrl() {
            this.$location.search(this.query);
            this.search();
        }

        search() {

            this.$rootScope.$emit('loading');
            if(!this.query.city/* || !this.tripCities.length*/) {
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
