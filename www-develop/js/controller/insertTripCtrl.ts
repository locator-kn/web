interface JQuery {
    cropper(): JQuery;
    cropper(options:any): JQuery;
}

interface FormData {
    width?:number;
    height?:number;
    xCoord?:number;
    yCoord?:number;
    nameOfTrip?:string;
    id?:string;
    rev?:string;
}
interface Datepicker {
    _defaults:any;
}

module Controller {

    export class InsertTripCtrl {

        activeItem:string = '';
        persons:number = 1;
        days:number = 1;
        accommodation:boolean = false;
        tripCity:string = '';
        tripTitle:string = '';
        tripDescription:string = '';
        tripDescriptionMoney:string = '';
        dateFormat:string = 'yy-mm-dd';

        startDateReal:any = '';
        endDateReal:any = '';
        selectedPlaceDetails:any;

        selectedMoods:any = [];
        selectableMoods:any = [];

        accommodationEquipment:any = [];
        accommodationEquipmentSelectable = false;
        progressPercentage:number;
        googlePlacesOptions = {
            country: 'de',
            types: '(cities)'
        };

        showImageUploadModal:boolean = false;
        imagePath:any;
        selectedImage:any;
        imageCropData:any;
        imageHasBeenUploaded:boolean;
        headerImagePath:string;
        uploadIsDone:boolean = true;
        documentId:string = '';
        revision:string = '';
        documentWasCreated:boolean = false;
        me:any;
        query:any = {};
        availableLocations:any = [];
        availableLocationsHash:any = {};
        selectedLocations:any = {};

        showAvailableLocations:boolean = true;
        showSelectedLocations:boolean = false;
        showAddLocationsBtn:boolean = true;
        backgroundImage:string = '';

        constructor(private $scope, private $rootScope, private $state, private $anchorScroll, private $location, private InsertTripService, private LocationService, private UserService, private DataService, private HelperService) {
            this.$scope.selectImage = this.selectImage;

            this.UserService.getMe().then(user => {
                this.me = user.data;
            });

            this.DataService.getMoods().then(result => {
                this.selectableMoods = result.data;
                console.log('Test' + this.selectableMoods);
            });


            this.LocationService.getMyLocations().then(response => {

                response.data.forEach((loc:any) => {

                    if(!loc.images) {
                        loc.images = {};
                        loc.images.picture = this.getStaticMap({
                            size: '1151x675',
                            geotag: loc.geotag
                        });
                        loc.images.thumbnail = this.getStaticMap({
                            size: '180x100',
                            geotag: loc.geotag
                        });
                    }
                    this.availableLocationsHash[loc._id] = loc;
                });
                this.availableLocations = response.data;
            });

            $rootScope.overlay = false;
            $rootScope.showSearchButton = true;

            // handle url params
            HelperService.getMoods(this.$state.params.moods, (result) => {
                this.selectedMoods = result;
            });

            this.tripCity = this.$state.params.city;



        }

        getStaticMap(options) {
            return 'https://maps.googleapis.com/maps/api/staticmap?size=' + options.size + '&zoom=15&scale=2&markers=' + options.geotag.lat + ',' + options.geotag.long;
        }

        addLocationToTrip(locationId) {
            this.selectedLocations[locationId] = this.availableLocationsHash[locationId];
            this.showSelectedLocations = true;
            delete this.availableLocationsHash[locationId];
            this.selectRandomImage();
        }

        removeLocationFromTrip(locationId) {
            this.availableLocationsHash[locationId] = this.selectedLocations[locationId];
            delete this.selectedLocations[locationId];
            this.selectRandomImage();
        }

        scrollTo(hash) {
            this.$location.hash(hash);
            this.$anchorScroll(hash);
        }

        isActive(item) {
            return item == this.activeItem;
        }

        addImage() {
            this.$rootScope.overlay = true;
            this.imageChoice();
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

        selectMood(mood) {
            this.selectedMoods.push(mood);
            this.selectableMoods.splice(this.selectableMoods.indexOf(mood), 1);
        }

        removeSelectedMood(mood) {
            this.selectedMoods.splice(this.selectedMoods.indexOf(mood), 1);
            this.selectableMoods.push(mood);
        }

        toggleAccommodation() {
            this.accommodation = !this.accommodation;
            if (this.accommodation) {
                this.accommodationEquipmentSelectable = true;
            } else {
                this.accommodationEquipment = [];
                this.accommodationEquipmentSelectable = false;
            }
        }

        showImageChooser() {
            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }
            $('#image-upload').click();
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
                nameOfTrip: this.tripTitle || 'supertrip',
                _id: '',
                _rev: ''
            };

            if (this.documentWasCreated) {
                formData._id = this.documentId;
                formData._rev = this.revision;
            }

            this.InsertTripService.uploadImage(formData, file)
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

        getLocationDetails() {
            if (!this.selectedPlaceDetails) {
                return;
            }
            return {
                title: this.selectedPlaceDetails.name,
                id: this.selectedPlaceDetails.id,
                place_id: this.selectedPlaceDetails.place_id
            }
        }

        selectRandomImage() {
            var sl = [];
            for (var key in this.selectedLocations) {
                if (this.selectedLocations.hasOwnProperty(key)) {
                    sl.push(this.selectedLocations[key].images.picture);
                }
            }
            this.backgroundImage = sl[Math.floor(Math.random() * (sl.length - 1))] || '';
            this.showAddLocationsBtn = !this.backgroundImage;
        }

        getSelectedLocations() {
            var sl = [];
            for (var key in this.selectedLocations) {
                if (this.selectedLocations.hasOwnProperty(key)) {
                    sl.push(key);
                }
            }
            return sl;
        }

        saveTrip() {
            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }
            var city = this.getLocationDetails();
            var t = {
                city: city,
                title: this.tripTitle,
                description: this.tripDescription,
                description_money: this.tripDescriptionMoney,
                start_date: this.startDateReal,
                end_date: this.endDateReal,
                accommodation: this.accommodation,
                accommodation_equipment: this.accommodationEquipment,
                persons: this.persons,
                days: this.days,
                moods: this.selectedMoods,
                locations: this.getSelectedLocations()
                //pics
                //active
                //delete
            };
            var documentMetaData = {
                _id: this.documentId || '',
                _rev: this.revision || ''
            };


            //store trip in DB
            this.InsertTripService.saveTrip(t, documentMetaData)
                .then(result => {
                this.revision = result.rev;
                this.documentId = result.id;
                this.documentWasCreated = true;
            }).then(() => {
                this.$state.go('search', {
                    city: t.city.title
                });
            });
        }


        static controllerId:string = "InsertTripCtrl";
    }
}
