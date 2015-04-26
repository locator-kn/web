module Controller {
    export class TripCtrl {

        trip;
        local;

        constructor(private $scope, private TriplerService, private DataService, private UserService) {
            this.getTrip(1);
        }

        getTrip(trip_ID) {
            this.TriplerService.getTrip().then(result => {
                this.trip = result;

                //get local information when localID is returned by getTrip()
                this.UserService.getUser(this.trip.local).then(result => {
                    this.local = result;
                });
            });
        }

        getLocalInformation(_localId) {
            this.UserService.getUser().then(result => {
                this.trip = result;
            });
        }

        static controllerId:string = "TripCtrl";
    }
}
