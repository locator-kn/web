module Controller {

    export class TripCtrl {

        trip:any = {};
        start_date;
        trips:any;
        availableMoods:any = [];
        user:any;
        username:string;
        locations:any = [];
        me:boolean;

        slides:string[] = [];

        static $inject = ['$scope', '$rootScope', '$stateParams', 'SearchService', 'TripService', 'DataService', 'UserService', 'LocationService', 'HelperService', 'KeenService'];
        constructor(private $scope, private $rootScope, private $stateParams, private SearchService, private TripService, private DataService, private UserService, private LocationService, private HelperService, private KeenService) {
            this.$rootScope.showSearchButton = true;
            this.$rootScope.showCreateButton = true;


            this.SearchService.getTripById(this.$stateParams.tripId)
                .then(result => {

                    this.trip = result.data;
                    this.$rootScope.breadcrumb = 'Tripdetail | ' + this.trip.title;
                    this.$scope.$emit('updateTitle', this.trip.title + ' | ' + this.trip.city.title);

                    this.UserService.getUser(this.trip.userid)
                        .then(result => {
                            this.user = result.data;
                            this.username = this.user.name + ' ' + this.user.surname;
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

                    this.$scope.$emit('updateOgElements', {
                        title: this.trip.title + ' | ' + this.trip.city.title,
                        description: this.trip.description,
                        url: window.location.href,
                        image: this.slides[0]
                    });

                    this.HelperService.getMoodByQueryName(this.trip.moods[0])
                        .then(result => {
                            this.trip.mood = result;
                            this.trip.moodImage = 'images/icons/moods_white/'+result.icon;
                        });

                    this.KeenService.add('pv', result.data, 'trip');

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
            this.TripService.participate(this.user, this.trip);
        }


        static controllerId:string = "TripCtrl";
    }
}
