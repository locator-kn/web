interface JQuery {
    cropper(): JQuery;
    cropper(options: any): JQuery;
}


module Controller {

    export class InsertTripCtrl {

        activeItem:string = '';
        persons:number = 1;
        days:number = 1;
        accomodation:boolean = false;
        tripTitle:string = '';
        tripDescription:string = '';
        tripMoney:string = '';
        selectedPlaceDetails: any;
        accomodationServices:string[] = [];
        googlePlacesOptions = {
            country: 'de',
            types: '(cities)'
        };

        showImageUploadModal:boolean = false;
        imagePath: any;
        selectedImage:any;
        imageCropData:any;

        constructor(private $scope, private $rootScope, private InsertTripService, private Upload, private basePath) {
            this.$scope.selectImage = this.selectImage;
            $scope.$on('mapentrySelected', (event, details)  => {
                this.selectedPlaceDetails = details;
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

        toggleAccomodation() {
            this.accomodation = !this.accomodation;

            if (!this.accomodation) {
                this.accomodationServices = [];
            }
        }

        showImageChooser() {
            $('#image-upload').click();
        }

        imageChoice() {
            $('.image-upload-modal > img').cropper({
                aspectRatio: 1,
                modal: false,
                rotatable: false,
                crop: (data) => {
                    console.log(data)
                    this.imageCropData = data
                }
            });
        }

        uploadImage() {
            var file = this.selectedImage;
            var formData = {
                width: Math.round(this.imageCropData.width),
                height: Math.round(this.imageCropData.height),
                xCoord: Math.round(this.imageCropData.x),
                yCoord: Math.round(this.imageCropData.y),
                nameOfTrip: 'scheisshaufen'



            };
            this.Upload.upload({
                url: this.basePath + '/trips/image',
                fields: formData,
                file: file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            });
            //this.InsertTripService.uploadImage(formData);
        }

        addAccomodationService(service:string) {
            if (this.accomodation) {
                if (this.containsAccomodation(service)) {
                    var index = this.accomodationServices.indexOf(service);
                    this.accomodationServices.splice(index, 1);
                } else {
                    this.accomodationServices.push(service);
                }
            }

            console.log(this.accomodationServices);
        }

        containsAccomodation(service:string) {
            var found = $.inArray(service, this.accomodationServices);
            if (found > -1) {
                return true;
            }
            return false;
        }

        getLocationDetails() {
            return {
                title: this.selectedPlaceDetails.name,
                id: this.selectedPlaceDetails.id,
                place_id: this.selectedPlaceDetails.place_id
            }
        }

        saveTrip() {
            var city = this.getLocationDetails();
            var t = {
                title: '',
                description: '',
                city: city,
                type: 'trip'
            };
            //store trip in DB
            this.InsertTripService.saveTrip(t).then(() => {
                console.log('party')
            })
        }


        static controllerId:string="InsertTripCtrl";
    }
}
