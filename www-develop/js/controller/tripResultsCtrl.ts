
module Controller {
    export class TripResultsCtrl {

        trips;
        params;

        constructor($scope,  private TriplerService, private $rootScope, private $state, private $stateParams) {
            this.filteredQuery();
            this.$rootScope.tripselected = false;
            this.params = $stateParams;
            this.params.checkin = new Date(this.params.checkin);
            this.params.checkout = new Date(this.params.checkout);
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

        setTraveller(value) {
            this.params.travellersCount = value;
        }

        static controllerId:string = "TripResultsCtrl";
    }
}
