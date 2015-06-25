module Controller {

    export class EditTripCtrl {


        myLocations = [];
        publicLocations = [];
        selectedLocations = [];

        showCities:string = 'showCitiesCreate';
        showMoods:string = 'showMoodsCreate';
        showDays:string = 'showDaysCreate';

        moods:any;
        open:any;
        selectedMood:any;

        cities:any;
        selectedCity:any;

        days:any;
        selectedDay:any;

        dataAvailable:boolean = false;

        locationSearch = '';


        constructor(private $q, private lodash, private $scope, private $timeout, private $rootScope, private $state, private $anchorScroll, private $location, private InsertTripService, private TripService, private LocationService, private UserService, private DataService, private HelperService) {

            var moods = this.DataService.getMoods();
            var cities = this.DataService.getCities();
            var days = this.DataService.getAvailableAmountOfDays();

            this.$q.all([moods, cities, days])
                .then((responsesArray) => {

                    this.moods = responsesArray[0].data;
                    this.selectedMood = this.moods[Math.floor((Math.random() * this.moods.length))];

                    this.cities = responsesArray[1].data;
                    this.selectedCity = this.cities[Math.floor((Math.random() * this.cities.length))];

                    this.days = responsesArray[2].data;
                    this.selectedDay = this.days[Math.floor((Math.random() * this.days.length))];

                    this.dataAvailable = true;

                    this.fetchLocations();
                });

        }

        fetchLocations() {
            console.info(this.selectedCity);
            this.LocationService.getLocationsByCity("Konstanz")
                .then(result => {
                    this.publicLocations = result.data;
                }).catch(err => {
                    console.info(err);
                });

            this.LocationService.getMyLocationsByCity("Konstanz")
                .then(result => {
                    this.myLocations = result.data;
                }).catch(err => {
                    console.info(err);
                });
        }

        static controllerId:string = "EditTripCtrl";
    }
}
