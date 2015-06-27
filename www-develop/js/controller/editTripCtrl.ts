module Controller {

    export class EditTripCtrl {

        showPreview = false;
        error = false;
        dateValid = false;

        tripId;
        myLocations = [];
        publicLocations = [];
        selectedLocations = [];

        slides = [];

        editDataAvailable = false;

        showCities:string = 'showCitiesCreate';
        showMoods:string = 'showMoodsCreate';
        showDays:string = 'showDaysCreate';

        moods:any;
        open:any;
        selectedMood:any;
        filledLocations;

        datePickerOnLinked = false;

        justShowMyLocations:boolean = false;


        cities:any;
        selectedCity:any;

        days:any;
        selectedDay:any;

        tripMeta:any = {
            title: '',
            persons: '',
            accommodation: false,
            description: '',
            start_date: '',
            end_date: '',
            accommodation_equipment: [],
            city: {}
        };

        accommodationEquipmentSelectable = true;
        dataAvailable:boolean = false;
        locationSearch = '';


        constructor(private smoothScroll, private $q, private lodash, private $scope, private $timeout, private $rootScope, private $state, private $anchorScroll, private $location, private InsertTripService, private TripService, private LocationService, private UserService, private DataService, private HelperService) {

            var moods = this.DataService.getMoods();
            var cities = this.DataService.getFixedCities();
            var days = this.DataService.getAvailableAmountOfDays();

            this.$q.all([moods, cities, days])
                .then((responsesArray) => {

                    this.moods = responsesArray[0].data;
                    this.cities = responsesArray[1].data;
                    this.days = responsesArray[2].data;
                    this.dataAvailable = true;


                    if (!this.$state.params.tripId) {
                        this.selectedMood = HelperService.getObjectByQueryName(this.moods, $state.params.moods) || this.moods[Math.floor((Math.random() * this.moods.length))];
                        this.selectedCity = HelperService.getCityByTitle(this.cities, $state.params.city) || this.cities[Math.floor((Math.random() * this.cities.length))];
                        this.selectedDay = HelperService.getObjectByQueryName(this.days, $state.params.days) || this.days[Math.floor((Math.random() * this.days.length))];

                        this.fetchLocations();
                    }

                    this.initEdit();
                });

            $scope.$watch(angular.bind(this, () => {
                return this.selectedCity;
            }), (newVal, oldVal) => {
                if (newVal != oldVal) {
                    this.fetchLocations();
                    if (!this.$state.params.tripId) this.$location.search('city', this.selectedCity.title);
                }
            });


            $scope.$watchCollection(angular.bind(this, () => {
                return [this.tripMeta.start_date, this.tripMeta.end_date];
            }), (newVal, oldVal) => {
                if (newVal != oldVal) {
                    this.dateValidation();
                }
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

            var public_locations = this.LocationService.getLocationsByCity(this.selectedCity.title);
            var private_locations = this.LocationService.getMyLocationsByCity(this.selectedCity.title);

            this.$q.all([public_locations, private_locations])
                .then((responsesArray) => {

                    this.publicLocations = responsesArray[0].data;
                    this.myLocations = responsesArray[1].data;

                    if (this.$state.params.tripId) {

                        //get preselected trips
                        this.fillSelectedLocations();

                    }
                });


        }

        selectLocation(location) {

            var _public = this._removeLocation(this.publicLocations, location);
            var _private = this._removeLocation(this.myLocations, location);

            if (_public && _private) {
                this._addLocation(this.selectedLocations, location, 'both');

            } else if (_public) {
                this._addLocation(this.selectedLocations, location, 'public');

            } else if (_private) {
                this._addLocation(this.selectedLocations, location, 'private');
            }

            this.buildSlidesArray();

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

            this.buildSlidesArray();
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

            return sl;
        }

        buildSlidesArray() {

            this.slides = [];

            this.selectedLocations.forEach((location:any) => {
                if (location.images.picture) {
                    this.slides.push(location.images.picture);
                }
                this.slides.push(location.images.googlemap + '&size=640x375');
            });

        }

        tripPreview() {

            if (this.tripMeta.title.length < 2 || this.selectedLocations.length === 0 || !this.tripMeta.start_date || !this.tripMeta.end_date || !this.tripMeta.persons) {

                this.dateValidation();

                this.error = true;
                return;
            } else {
                this.error = false;
            }


            this.showPreview = true;
            var element = document.getElementById('tripviewpreview');
            this.smoothScroll(element);
        }


        dateValidation() {

            if (this.tripMeta.start_date === "Invalid date" || this.tripMeta.end_date === "Invalid date") {
                this.dateValid = false;
            } else if (this.tripMeta.start_date === "" || this.tripMeta.end_date === "") {
                this.dateValid = false;
            } else {
                this.dateValid = true;
            }

        }

        saveTrip() {
            var trip = this.tripMeta;
            trip.city = this.selectedCity;
            trip.days = this.selectedDay.id;
            trip.moods = [this.selectedMood.query_name];

            trip.locations = this.getSelectedLocations();


            this.TripService.saveTrip(trip, this.tripId)
                .then(result => {
                    console.info('success');
                })
                .catch(err => {
                    console.info('error');
                });
        }

        initEdit() {
            if (this.$state.params.tripId) {
                this.tripId = this.$state.params.tripId;
                this.datePickerOnLinked = true;

                this.TripService.getTripById(this.$state.params.tripId)
                    .then(result => {

                        this.tripMeta.start_date = result.data.start_date;
                        this.tripMeta.end_date = result.data.end_date;

                        this.tripMeta.description = result.data.description;
                        this.tripMeta.title = result.data.title;
                        this.tripMeta.persons = result.data.persons;

                        this.selectedDay = this.HelperService.getObjectById(this.days, result.data.days);
                        this.selectedCity = this.HelperService.getCityByTitle(this.cities, result.data.city.title);
                        this.selectedMood = this.HelperService.getObjectByQueryName(this.moods, result.data.moods.join('.'));

                        //city is set, so get the locations for it
                        this.fetchLocations();

                        this.filledLocations = result.data.locations;

                        if (this.tripMeta.accommodation = result.data.accommodation) {
                            this.tripMeta.accommodation_equipment = result.data.accommodation_equipment;
                            this.accommodationEquipmentSelectable = true;
                        }

                        this.editDataAvailable = true;


                    }).catch(err => {
                        console.info('error gettin trip', err);
                    })
            }
        }

        //this should be triggered when editing a trip
        fillSelectedLocations() {

            var allLocations;
            var alreadySortedIn = [];

            for (var key in this.filledLocations) {

                this.LocationService.getLocationById(key).then(result => {
                    this.selectLocation(result.data);
                })

            }
        }


        static controllerId:string = "EditTripCtrl";
    }
}
