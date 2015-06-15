module Controller {

    export class TripCtrl {

        trip:any = {};
        start_date;
        trips:any;

        constructor(private $rootScope, private $stateParams, private SearchService, private TripService) {
            this.getMyTrips();

            this.$rootScope.showSearchButton = true;
            this.$rootScope.showCreateButton = true;

            this.SearchService.getTripById(this.$stateParams.tripId)
                .then(result => {
                    this.trip = result.data[0];
                    this.trip.start_date = moment(new Date(this.trip.start_date)).format('L');
                    this.trip.end_date = moment(new Date(this.trip.end_date)).format('L');
                });
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
