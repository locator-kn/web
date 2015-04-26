
module Controller {
    export class TriplerResultCtrl {

        trips;

        constructor($scope, private TriplerService, private $rootScope) {
            this.filteredQuery();
        }

        filteredQuery() {
            this.TriplerService.filteredQue().then(result => {
                this.trips = result;
            })
        }

        selectTrip(_id) {
            this.$rootScope.tripselected = true;
        }

        deselectTrip() {
            this.$rootScope.tripselected = false;
        }

        static controllerId:string = "TriplerResultCtrl";
    }
}
