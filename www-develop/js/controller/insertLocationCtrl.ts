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

        locationTitle:string = '';

        googlePlacesOptions = {
            country: 'de'
        };

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

        constructor(private $state, private $scope, private $rootScope, private LocationService, private UserService) {


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


            this.LocationService.getCityByCoords(this.map.clickedMarker.latitude, this.map.clickedMarker.longitude)
                .then(result => {
                    var locality;
                    result.data.results.forEach(item => {
                        if (item.types[0] == 'locality') {
                            locality = item;
                        }
                    });

                    this.locationFormDetails.city.title = locality.formatted_address;
                    this.locationFormDetails.city.place_id = locality.place_id;
                    this.locationFormDetails.city.id = locality.place_id;
                });

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

            if (this.documentWasCreated) {
                formData._id = this.documentId;
                formData._rev = this.revision;
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
                    this.showNewImage(data);
                    this.documentId = data.id;
                    this.revision = data.rev;
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
            this.headerImagePath = data.imageLocation.picture;
        }

        save() {
            var formValues = angular.copy(this.locationFormDetails);


            formValues.tags = formValues.tags.split(' ');

            formValues.geotag = {
                long: this.map.clickedMarker.longitude,
                lat: this.map.clickedMarker.latitude
            };



            this.LocationService.saveLocation(formValues, this.documentId).
                then(() => {
                    this.$state.go('user', {tab: 'locations', profileId: this.$rootScope.userID});
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
                            tags: result.data.tags.join(' '),
                            title: result.data.title,
                            description: result.data.description,
                            budget: result.data.budget,
                            city: {}
                        }

                        var lat = result.data.geotag.lat;
                        var long = result.data.geotag.long;


                        this.map.clickedMarker.latitude = lat;
                        this.map.clickedMarker.longitude = long;

                        this.map.center.latitude = lat;
                        this.map.center.longitude = long;
                        this.mapMarkerSet = true;

                        this.headerImagePath = result.data.images.picture;
                        this.imageHasBeenUploaded = true;

                        this.documentId = result.data._id;


                    })
                    .catch(err => {
                        console.info("error during getlocation");
                    })
            }

        }

        static controllerId:string = "InsertLocationCtrl";
    }
}
