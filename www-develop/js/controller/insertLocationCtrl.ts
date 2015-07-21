module Controller {

    export class InsertLocationCtrl {
        progressPercentage:number = 0;
        showImageUploadModal:boolean = false;
        selectedImage:any;
        imagePath:any = '';
        imageCropData:any = {};
        uploadIsDone:boolean = true;
        documentWasCreated:boolean = false;
        documentId:string = '';
        revision:string = '';
        imageHasBeenUploaded:boolean = false;
        headerImagePath:string = '';
        mapMarkerSet:boolean = false;

        isUploading:boolean = false;
        error:boolean = false;
        gpsLoading:boolean = false;

        edgeCity = {
            id: '',
            place_id: '',
            name: ''
        };

        locationTitle:string = '';

        googlePlacesOptions = {
        };

        googleCityOptions = {
            types: '(cities)'

        };

        headline:string;

        map:any = {};
        clickedMarker:any = {};
        selectedPlaceDetails:any = {};

        locationFormDetails:any = {
            tags: '',
            title: '',
            description: '',
            city: {}
        };

        showImageTooLargeModal:boolean = false;

        me:any = {};

        static $inject = ['$analytics', '$element', 'UtilityService', 'ngDialog', 'InsertTripService', 'geolocation', '$state', '$scope', '$rootScope', 'LocationService', 'UserService'];

        constructor(private $analytics, private $element, private UtilityService, private ngDialog, private InsertTripService, private geolocation, private $state, private $scope, private $rootScope, private LocationService, private UserService) {

            if (this.$state.current.name === 'insertLocation') {
                this.$rootScope.breadcrumb = 'Location erstellen';
                this.headline = 'Neue Location erstellen';
            }

            $scope.$watch(angular.bind(this, () => {
                return this.selectedPlaceDetails;
            }), (newVal, oldVal) => {
                if (newVal != oldVal) {
                    this.selectLocationFromInput();
                }
            });


            $rootScope.showSearchButton = true;
            $rootScope.showCreateButton = true;

            this.map = {
                center: {
                    // kn fh
                    latitude: 47.668403,
                    longitude: 9.170499
                },
                zoom: 12,
                clickedMarker: {
                    id: 0,
                    options: {
                        labelClass: 'marker-labels',
                        labelAnchor: '50 0'
                    },
                    latitude: null,
                    longitude: null
                },
                events: this.getEvents()
            };

            this.UserService.getMe().then(user => {
                this.me = user.data;
            });

            $scope.$on('mapentrySelected', (event, details) => {
                this.map.center.latitude = details.geometry.location.A;
                this.map.center.longitude = details.geometry.location.F;
            });

            this.initEdit();
        }

        getEvents() {
            return {
                click: (mapModel, eventName, originalEventArgs) => {
                    this.clickMapEvent(mapModel, eventName, originalEventArgs);
                }
            }
        }

        clickMapEvent(mapModel, eventName, originalEventArgs) {
            var e = originalEventArgs[0];
            var lat = e.latLng.lat(),
                lon = e.latLng.lng();
            this.map.clickedMarker = {
                id: 0,
                options: {
                    labelClass: "marker-labels",
                    labelAnchor: "50 0"
                },
                latitude: lat,
                longitude: lon
            };
            this.mapMarkerSet = true;
            this.$scope.$apply();

            this.getCityFromMarker();

        }

        selectImage(file) {
            if (file.files && file.files[0]) {
                var reader = new FileReader();
                var image = new Image();
                this.selectedImage = file.files[0];

                if (this.selectedImage.size >= 6291456) {
                    this.$rootScope.overlay = true;
                    this.showImageTooLargeModal = true;
                    this.$rootScope.$apply();
                    return
                }

                this.$rootScope.overlay = true;
                this.showImageUploadModal = true;
                reader.readAsDataURL(file.files[0]);
                reader.onload = (_file) => {

                    this.imagePath = _file.target;
                    this.$scope.$apply();
                    this.addImage();
                }
            }
        }

        showImageChooser() {
            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }
            this.clearFileSelection();
            $('#image-upload').click();
        }

        addImage() {
            this.$rootScope.overlay = true;
            this.imageChoice();
        }

        imageChoice() {
            var cropperElem:any = $('#cropping-preview');
            cropperElem.cropper({
                aspectRatio: 1024 / 600,
                modal: false,
                rotatable: false,
                crop: (data) => {
                    this.imageCropData = data
                }
            });
        }

        uploadImage() {
            this.uploadIsDone = false;

            this.isUploading = true;
            var file = this.selectedImage;
            var formData = {
                width: Math.round(this.imageCropData.width),
                height: Math.round(this.imageCropData.height),
                xCoord: Math.round(this.imageCropData.x),
                yCoord: Math.round(this.imageCropData.y),
                locationTitle: this.locationTitle.toLowerCase() || 'supertrip',
                _id: '',
                _rev: ''
            };

            if (this.documentId) {
                formData._id = this.documentId;
            }


            this.LocationService.uploadImage(formData, file)
                .error(() => {

                    this.isUploading = false;
                })
                .progress(evt => {
                    var perc:number = evt.loaded / evt.total;
                    this.progressPercentage = Math.round(perc * 100);
                }).success((data, status, headers, config) => {
                    this.clearFileSelection();
                    this.documentId = data.id;
                    this.showNewImage(headers());

                    this.uploadIsDone = true;
                    this.isUploading = false;
                    this.progressPercentage = 0;
                });
        }

        clearFileSelection() {
            this.showImageUploadModal = false;
            this.$rootScope.overlay = false;
            this.showImageTooLargeModal = false;
            this.selectedImage = null;
            this.imagePath = '';
            $('#cropping-preview').removeData('cropper');
            $('.cropper-container').remove();
            $('#image-upload').val('')
        }

        showNewImage(data) {
            this.imageHasBeenUploaded = true;
            var cacheBuster = Date.now();
            this.headerImagePath = data.location + '?size=mid&c=' + cacheBuster;
        }

        /* Save a Location with the edgecase modal */
        edgeCaseSave() {
            this.locationFormDetails.city.place_id = this.edgeCity.place_id;
            this.locationFormDetails.city.title = this.edgeCity.name;
            this.locationFormDetails.city.id = this.edgeCity.id;
            this.$rootScope.overlay = false;
            this.save();
        }

        save() {

            if (!this.mapMarkerSet || !this.locationFormDetails.title || !this.locationFormDetails.description || !this.locationFormDetails.tags) {
                this.error = true;
                return;
            }

            //detect edgeedgecase and open manual city select
            if (!this.locationFormDetails.city.place_id && !this.edgeCity.place_id) {
                this.openCityModal();
                return;
            }

            var formValues = angular.copy(this.locationFormDetails);

            var stringTags = [];
            formValues.tags.forEach(item => {
                stringTags.push(item.text);
            });
            formValues.tags = stringTags;


            formValues.geotag = {
                long: this.map.clickedMarker.longitude,
                lat: this.map.clickedMarker.latitude
            };


            this.LocationService.saveLocation(formValues, this.documentId).
                then((result) => {


                    if (this.$state.params.tmp) {

                        this.$analytics.eventTrack('create location on the fly');

                        var data = this.InsertTripService.getAllValues();
                        this.InsertTripService.newCreatedLocationId = result.data.id;

                        this.$state.go('editTrip', {tripId: data.tripId, city: data.city.title, tmp: 'true'});

                    } else {

                        if (this.$state.params.locationId) {
                            this.$analytics.eventTrack('edit location success');
                        } else {
                            this.$analytics.eventTrack('create location success');
                        }

                        this.$state.go('user', {tab: 'locations', profileId: this.$rootScope.userID});
                    }

                })
                .catch((err) => {
                    console.log(err);
                })
        }

        initEdit() {

            if (this.$state.params.locationId) {


                this.LocationService.getLocationById(this.$state.params.locationId)
                    .then(result => {

                        this.$analytics.eventTrack('start edit location');

                        this.locationFormDetails = {
                            tags: this.simpleToObjectArray(result.data.tags),
                            title: result.data.title,
                            description: result.data.description,
                            city: result.data.city
                        };

                        //handle tags for tagging directive
                        //this.locationFormDetails.tags = this.simpleToObjectArray(this.locationFormDetails.tags);


                        var lat = result.data.geotag.lat;
                        var lon = result.data.geotag.long;

                        this.map.clickedMarker.latitude = lat;
                        this.map.clickedMarker.longitude = lon;

                        this.map.center.latitude = lat;
                        this.map.center.longitude = lon;
                        this.mapMarkerSet = true;

                        this.getCityFromMarker();

                        this.headerImagePath = result.data.images.picture;
                        this.imageHasBeenUploaded = true;

                        this.documentId = result.data._id;


                        if (this.$state.current.name === 'insertLocation') {
                            this.$rootScope.breadcrumb = 'Location erstellen';
                        } else {
                            this.headline = 'Location ' + this.locationFormDetails.title + '  bearbeiten';
                            this.$rootScope.breadcrumb = 'Location bearbeiten | ' + this.locationFormDetails.title;
                        }


                    })
                    .catch(err => {
                        console.info("error during getlocation");
                        this.$analytics.eventTrack('gps error');
                        this.UtilityService.errorMsg('GPS Fehler', 'Positionsbestimmung nict möglich. Bitte Prüfe deine Datenschutzeinstellungen.');
                    })
            }

        }

        selectLocationFromInput() {

            var lat;
            var lon;

            lat = this.selectedPlaceDetails.geometry.location.A;
            lon = this.selectedPlaceDetails.geometry.location.F;

            this.map.clickedMarker.latitude = lat;
            this.map.clickedMarker.longitude = lon;
            this.map.zoom = 15;
            this.map.center.latitude = lat;
            this.map.center.longitude = lon;
            this.mapMarkerSet = true;

            this.getCityFromMarker();
        }


        getMyLocation() {
            this.gpsLoading = true;
            this.geolocation.getLocation().then(data => {

                this.gpsLoading = false;

                var lat = data.coords.latitude;
                var lon = data.coords.longitude;
                this.map.zoom = 15;
                this.map.clickedMarker.latitude = lat;
                this.map.clickedMarker.longitude = lon;

                this.map.center.latitude = lat;
                this.map.center.longitude = lon;
                this.mapMarkerSet = true;

                this.getCityFromMarker();

            });

            this.$scope.$on('error', (event, data) => {
                this.UtilityService.errorMsg('GPS Error', 'Prüfe deine GPS Einstellungen');
            });

        }

        getCityFromMarker() {

            this.LocationService.getCityByCoords(this.map.clickedMarker.latitude, this.map.clickedMarker.longitude)
                .then(result => {


                    var locality;
                    result.forEach((item:any) => {
                        if (item.types[0] === 'locality') {
                            locality = item;
                        }
                    });

                    if (locality) {

                        this.insertLocality(locality);
                        return;

                    } else {

                        var cityname;
                        result[0].address_components.forEach((item:any) => {
                            if (item.types[0] === 'locality') {
                                cityname = item.long_name;
                            }
                        });

                        if (cityname) {

                            this.LocationService.getPlaceIdByAddress(cityname)
                                .then(nestedResult => {

                                    locality = {};
                                    locality.place_id = nestedResult[0].place_id;
                                    locality.formatted_address = nestedResult[0].formatted_address;
                                    this.insertLocality(locality);
                                    return;

                                })
                                .catch(error => {
                                    console.log(error);
                                });

                        }
                    }

                });
        }

        //used to resolve tagging arrays
        simpleToObjectArray(simpleArray) {
            var complexArray = [];

            simpleArray.forEach(item => {
                complexArray.push({text: item});
            });


            return complexArray;
        }

        insertLocality(locality) {
            this.locationFormDetails.city.title = locality.formatted_address;
            this.locationFormDetails.city.place_id = locality.place_id;
            this.locationFormDetails.city.id = locality.place_id;
        }

        openCityModal() {
            this.$rootScope.overlay = true;
            angular.element('#edgecase').addClass('active');
            console.info(angular.element('#edgecase'));
            this.$analytics.eventTrack('location edgecase modal opened');
            $('#edgecase').addClass('active');
        }

        static controllerId:string = "InsertLocationCtrl";
    }
}
