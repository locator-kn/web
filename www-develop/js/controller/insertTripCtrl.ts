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

        accommodationEquipment:string[] = [];
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

        constructor(private $scope, private $rootScope, private $state, private InsertTripService, private lodash, private UserService, private DataService, private HelperService) {
            this.$scope.selectImage = this.selectImage;
            $scope.$on('mapentrySelected', (event, details)  => {
                this.selectedPlaceDetails = details;
            });

            this.UserService.getMe().then(user => {
                this.me = user.data;
            });

            this.DataService.getMoods().then(result => {
                this.selectableMoods = result.data;
                this.selectedMoods = $state.params.moods;
            });

            $rootScope.overlay = false;
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

        toggleAccommodation() {
            this.accommodation = !this.accommodation;

            if (!this.accommodation) {
                this.accommodationEquipment = [];
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

        addAccommodationEquipment(service:string) {
            if (this.accommodation) {
                if (this.containsAccommodation(service)) {
                    var index = this.accommodationEquipment.indexOf(service);
                    this.accommodationEquipment.splice(index, 1);
                } else {
                    this.accommodationEquipment.push(service);
                }
            }

            console.log(this.accommodationEquipment);
        }

        containsAccommodation(service:string) {
            return !!this.lodash.findWhere(this.accommodationEquipment, service);
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
                //moods
                //locations
                //pics
                //active
                //delete

                type: 'trip'
            };
            var documentMetaData = {
                _id: this.documentId || '',
                _rev: this.revision || ''
            };


            //store trip in DB
            this.InsertTripService.saveTrip(t, documentMetaData).then(() => {
                console.log('party')
            }).then(result => {
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
