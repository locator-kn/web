module Controller {

    export class TripCtrl {

        trip:any = {};
        start_date;
        trips:any;
        availableMoods:any = [];
        user:any;
        locations:any = [];

        constructor(private $rootScope, private $stateParams, private SearchService, private TripService, private DataService, private UserService, private LocationService) {
            this.$rootScope.showSearchButton = true;
            this.$rootScope.showCreateButton = true;

            this.SearchService.getTripById(this.$stateParams.tripId)
                .then(result => {
                    this.trip = result.data[0];
                    this.trip.start_date = moment(new Date(this.trip.start_date)).format('L');
                    this.trip.end_date = moment(new Date(this.trip.end_date)).format('L');

                    this.UserService.getUser(this.trip.userid)
                        .then(result => {
                            this.user = result.data;
                        });
                    this.trip.locations.forEach(entry => {
                        this.LocationService.getLocationById(entry)
                            .then(result => {
                                this.locations.push(result.data);
                            });
                    });
                });

            this.DataService.getMoods().then(result => {
                this.availableMoods = result.data;
            });

        }

        getMyTrips() {
            this.TripService.getMyTrips().then(result => {
                this.trips = result.data;
            })
        }


        static controllerId:string = "TripCtrl";
    }
}
