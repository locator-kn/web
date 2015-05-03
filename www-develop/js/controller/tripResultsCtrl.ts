
module Controller {
    export class TripResultsCtrl {

        trips;
        params;

        constructor($scope,  private TriplerService, private $rootScope, private $state, private $stateParams) {
            this.filteredQuery();
            this.$rootScope.tripselected = false;
            this.params = $stateParams;
            console.log(this.params.travellersCount);
        }

        filteredQuery() {
            this.TriplerService.filteredQue().then(result => {
                this.trips = result.data;
            })
        }

        selectTrip(_id) {
            this.$rootScope.tripselected = true;
        }

        deselectTrip() {
            this.$rootScope.tripselected = false;
        }

        static controllerId:string = "TripResultsCtrl";
    }
}
