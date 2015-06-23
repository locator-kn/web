module Controller {

    export class TripCtrl {

        trip:any = {};
        start_date;
        trips:any;
        availableMoods:any = [];
        user:any;
        locations:any = [];
        me:boolean;

        slides:string[] = [];

        constructor(private $rootScope, private $stateParams, private SearchService, private TripService, private DataService, private UserService, private LocationService) {
            this.$rootScope.showSearchButton = true;
            this.$rootScope.showCreateButton = true;

            this.SearchService.getTripById(this.$stateParams.tripId)
                .then(result => {
                    this.trip = result.data;
                    this.trip.start_date = moment(new Date(this.trip.start_date)).format('L');
                    this.trip.end_date = moment(new Date(this.trip.end_date)).format('L');

                    this.UserService.getUser(this.trip.userid)
                        .then(result => {
                            this.user = result.data;
                            this.me = this.$rootScope.userID === (this.user._id || this.user.id);

                        });

                    var locationsHash = this.trip.locations;
                    for (var key in locationsHash) {
                        if (locationsHash.hasOwnProperty(key)) {
                            this.LocationService.getLocationById(key)
                                .then(result => {
                                    this.locations.push(result.data);
                                });
                        }
                    }
                    this.slides = this.TripService.getHeaderImagesByTrip(this.trip);

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

        participate() {
            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }

            this.$rootScope.$emit('new_conversation');
        }


        static controllerId:string = "TripCtrl";
    }
}
