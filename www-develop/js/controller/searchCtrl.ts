module Controller {
    export class SearchCtrl {

        query:any;
        activeItem:string = '';
        selectableMoods;
        selectedMoods = [];
        showSelectableMoods = false;
        tripCities = [];

        constructor(private HelperService, private $scope, private $rootScope, private $location, private SearchService, private DataService, private $state) {

            
            this.query = $location.search();
            this.query.accomodation = false;

            $rootScope.showSearchButton = false;
            $rootScope.showCreateButton = true;

            this.$rootScope.$emit('loading');

            this.DataService.getMoods()
                .then(result => {
                    this.selectableMoods = result.data;
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

        toggleAccomodation() {

            if (typeof this.query.accomodation === "undefined") {
                this.query.accomodation = true;
            } else {
                this.query.accomodation = !this.query.accomodation;
            }

            this.updateUrl();
        }

        selectMood(mood) {
            this.selectedMoods.push(mood);
            this.query.moods = (this.HelperService.getMoodQuery(this.selectedMoods));
            this.selectableMoods.splice(this.selectableMoods.indexOf(mood), 1);

            this.updateUrl();
        }

        removeSelectedMood(mood) {
            this.selectableMoods.push(mood);
            this.selectedMoods.splice(this.selectedMoods.indexOf(mood), 1);
            this.query.moods = (this.HelperService.getMoodQuery(this.selectedMoods));
            console.info(this.selectableMoods);

            this.updateUrl();

        }

        emitResult(result) {
            this.$rootScope.$emit('newSearchResults', result);
        }

        static controllerId:string = "SearchCtrl";
    }
}
