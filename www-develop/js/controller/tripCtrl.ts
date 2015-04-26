module Controller {
    export class TripCtrl {

        trip;

        constructor(private $scope, private TriplerService, private DataService) {
            this.getTrip();
        }

        getTrip() {
            this.TriplerService.getTrip().then(result => {
                this.trip = result;
                console.info(this.trip);
            });
        }

        static controllerId:string="TripCtrl";
    }
}
