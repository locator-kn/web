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

        locationTitle:string = '';

        googlePlacesOptions = {
            country: 'de'
        };

        headline:string;

        map:any = {};
        clickedMarker:any = {};
        selectedPlaceDetails:any = {};

        locationFormDetails:any = {
            tags: '',
            title: '',
            description: '',
            budget: '',
            city: {}
        };

        showImageTooLargeModal:boolean = false;

        me:any = {};

        constructor(private InsertTripService, private geolocation, private $state, private $scope, private $rootScope, private LocationService, private UserService) {

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
            console.log(this.map.clickedMarker);
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
            var cropperElem = $('#cropping-preview');
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
                    console.log('progress:', this.progressPercentage, '% ', evt.config.file.name);
                }).success((data, status, headers, config) => {
                    console.log('file', config.file.name, 'uploaded. Response:', data);
                    this.clearFileSelection();
                    this.documentId = data.id;
                    this.showNewImage(headers());

                    this.uploadIsDone = true;
                    this.isUploading = false;
                    this.progressPercentage = 0;
                });

            //this.InsertTripService.uploadImage(formData);
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

        save() {

            if (!this.mapMarkerSet || !this.locationFormDetails.title || !this.locationFormDetails.description || !this.locationFormDetails.tags) {
                this.error = true;
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

                        var data = this.InsertTripService.getAllValues();
                        this.InsertTripService.newCreatedLocationId = result.data.id;

                        this.$state.go('editTrip', {tripId: data.tripId, city: data.city.title, tmp: 'true'});

                    } else {
                        this.$state.go('user', {tab: 'locations', profileId: this.$rootScope.userID});
                    }

                })
                .catch(() => {
                    debugger
                })
        }

        initEdit() {

            if (this.$state.params.locationId) {


                this.LocationService.getLocationById(this.$state.params.locationId)
                    .then(result => {

                        this.locationFormDetails = {
                            tags: this.simpleToObjectArray(result.data.tags),
                            title: result.data.title,
                            description: result.data.description,
                            budget: result.data.budget
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

        }

        getCityFromMarker() {
            this.LocationService.getCityByCoords(this.map.clickedMarker.latitude, this.map.clickedMarker.longitude)
                .then(result => {
                    var locality;
                    result.data.results.forEach((item:any) => {
                        if (item.types[0] == 'locality') {
                            locality = item;
                        }
                    });

                    if (!locality) {
                        return;
                    }

                    this.locationFormDetails.city.title = locality.formatted_address;
                    this.locationFormDetails.city.place_id = locality.place_id;
                    this.locationFormDetails.city.id = locality.place_id;
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

        static controllerId:string = "InsertLocationCtrl";
    }
}
