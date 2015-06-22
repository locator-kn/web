module Controller {
    export class SearchCtrl {

        query:any = {};
        activeItem:string = '';
        selectedMoods = [];
        selectableMoods = [];
        showSelectableMoods = false;
        tripCities = [];

        constructor(private HelperService, private $scope, private $rootScope, private $location, private SearchService, private DataService, private $state, private UserService) {
            this.query = $location.search();
            this.query.accommodation = false;

            $rootScope.showSearchButton = false;
            $rootScope.showCreateButton = true;

            this.$rootScope.$emit('loading');

            this.DataService.getMoods().then(result => {
                this.selectableMoods = result.data;
            });

            HelperService.getMoodsByQueryString($state.params.moods).then(moods => {
                this.selectedMoods = moods;
                this.updateUrl();
            }).catch(console.error);

            this.DataService.getAvailableCities()
                .then(result => {
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
            this.HelperService.saveSearchContext();
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
