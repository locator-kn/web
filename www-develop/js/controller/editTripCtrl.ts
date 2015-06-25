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

        justShowMyLocations:boolean = false

        cities:any;
        selectedCity:any;

        days:any;
        selectedDay:any;

        tripMeta:any = {
            title: '',
            persons: '',
            accommodation: false,
            description: '',
            budget: '',
            accommodationEquipment: [],
            city: {}
        };

        accommodationEquipmentSelectable = false;

        dataAvailable:boolean = false;

        locationSearch = '';


        constructor(private $q, private lodash, private $scope, private $timeout, private $rootScope, private $state, private $anchorScroll, private $location, private InsertTripService, private TripService, private LocationService, private UserService, private DataService, private HelperService) {

            var moods = this.DataService.getMoods();
            var cities = this.DataService.getCities();
            var days = this.DataService.getAvailableAmountOfDays();

            this.$q.all([moods, cities, days])
                .then((responsesArray) => {

                    this.moods = responsesArray[0].data;


                    this.cities = responsesArray[1].data;


                    this.days = responsesArray[2].data;


                    this.dataAvailable = true;

                    this.selectedMood = HelperService.getObjectByQueryName(this.moods, $state.params.moods);
                    this.selectedCity = HelperService.getCityByTitle(this.cities, $state.params.city);
                    this.selectedDay = HelperService.getObjectByQueryName(this.days, $state.params.days);

                    debugger;


                    this.fetchLocations();
                });

        }

        toggleAccommodation() {
            this.tripMeta.accommodation = !this.tripMeta.accommodation;
            if (this.tripMeta.accommodation) {
                this.accommodationEquipmentSelectable = true;
            } else {
                this.tripMeta.accommodationEquipment = [];
                this.accommodationEquipmentSelectable = false;
            }
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

        selectLocation(location) {

            var public = this._removeLocation(this.publicLocations, location);
            var private = this._removeLocation(this.myLocations, location);

            if (public && private) {
                this._addLocation(this.selectedLocations, location, 'both');

            } else if (public) {
                this._addLocation(this.selectedLocations, location, 'public');

            } else if (private) {
                this._addLocation(this.selectedLocations, location, 'private');
            }

        }

        deSelectLocation(locationtodeselect) {
            this._removeLocation(this.selectedLocations, locationtodeselect);

            if (locationtodeselect.origin === 'both') {
                this.publicLocations.push(locationtodeselect);
                this.myLocations.push(locationtodeselect);

            } else if (locationtodeselect.origin === 'private') {
                this.myLocations.push(locationtodeselect);

            } else if (locationtodeselect.origin === 'public') {
                this.publicLocations.push(locationtodeselect);
            }
        }

        _removeLocation(locations, locationtoremove) {
            var index = this.lodash.findIndex(locations, {'_id': locationtoremove._id});
            if (index === -1) return false;
            locations.splice(index, 1);
            return true;
        }

        _addLocation(locations, locationtoadd, origin) {
            locationtoadd.origin = origin;
            locations.push(locationtoadd);
        }

        getSelectedLocations() {

            var sl = {};
            this.selectedLocations.forEach(location => {
                sl[location._id] = location.images;
            });

            debugger;
            return sl;
        }


        static controllerId:string = "EditTripCtrl";
    }
}
