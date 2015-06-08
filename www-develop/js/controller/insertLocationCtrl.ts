module Controller {

    export class InsertLocationCtrl {
        progressPercentage:number = 0;
        showImageUploadModal:boolean = false;
        selectedImage:any;
        imagePath:any = '';
        imageCropData:any = {};
        uploadIsDone:boolean = false;
        documentWasCreated:boolean = false;
        documentId:string = '';
        revision:string = '';
        imageHasBeenUploaded:boolean = false;
        headerImagePath:string = '';

        locationTitle:string = '';

        googlePlacesOptions = {
            country: 'de',
            types: '(cities)'
        };

        map:any = {};
        clickedMarker:any = {};
        selectedPlaceDetails:any = {};

        locationFormDetails:any = {
            title: '',
            description: '',
            budget: '',
            category: '',
            selectedMoods: [],
            city: {}
        };

        constructor(private $scope, private $rootScope, private InsertLocationService) {
            this.map = {
                center: {
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
            this.$scope.$apply();
        }

        selectImage(file) {
            this.$rootScope.overlay = true;
            this.showImageUploadModal = true;
            if (file.files && file.files[0]) {
                var reader = new FileReader();
                var image = new Image();
                this.selectedImage = file.files[0];
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
                    console.log(data)
                    this.imageCropData = data
                }
            });
        }

        uploadImage() {
            this.uploadIsDone = false;
            var file = this.selectedImage;
            var formData = {
                width: Math.round(this.imageCropData.width),
                height: Math.round(this.imageCropData.height),
                xCoord: Math.round(this.imageCropData.x),
                yCoord: Math.round(this.imageCropData.y),
                nameOfTrip: this.locationTitle || 'supertrip',
                _id: '',
                _rev: ''
            };

            if (this.documentWasCreated) {
                formData._id = this.documentId;
                formData._rev = this.revision;
            }

            this.InsertLocationService.uploadImage(formData, file)
                .progress(evt => {
                    var perc:number = evt.loaded / evt.total;
                    this.progressPercentage = perc;
                    console.log('progress:', this.progressPercentage * 100, '% ', evt.config.file.name);
                }).success((data, status, headers, config) => {
                    console.log('file', config.file.name, 'uploaded. Response:', data);
                    this.clearFileSelection();
                    this.showNewImage(data);
                    this.documentId = data.id;
                    this.revision = data.rev;
                    this.uploadIsDone = true;
                    var tripImage = document.getElementById("trip-image");
                    tripImage.style.height = "auto";
                });

            //this.InsertTripService.uploadImage(formData);
        }

        clearFileSelection() {
            this.showImageUploadModal = false;
            this.$rootScope.overlay = false;
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
            this.locationFormDetails.city = {

                title: this.selectedPlaceDetails.name,
                id: this.selectedPlaceDetails.id,
                place_id: this.selectedPlaceDetails.place_id
            }
            this.InsertLocationService.saveLocation(this.locationFormDetails).
                then(() => {
                    debugger
                })
                .catch(() => {
                    debugger
                })
        }

        static controllerId:string = "InsertLocationCtrl";
    }
}
