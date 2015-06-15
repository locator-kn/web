module Controller {

    export class TripCtrl {

        trip:any = {};
        start_date;
        trips:any;

        constructor(private $rootScope, private $stateParams, private SearchService, private TripService) {
            this.getMyTrips();
        }

        getMyTrips() {
            this.TripService.getMyTrips().then(result => {
                this.trips = result.data;
                console.info(this.trips);
            })
        }


        static controllerId:string = "TripCtrl";
    }
}
