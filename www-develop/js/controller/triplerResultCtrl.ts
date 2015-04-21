
module Controller {
    export class TriplerResultCtrl {

        trips;

        constructor($scope, private TriplerService) {
            this.filteredQuery();
        }

        filteredQuery() {
            this.TriplerService.filteredQue().then(result => {
                this.trips = result;
            })
        }

        static controllerId:string = "TriplerResultCtrl";
    }
}
