interface JQuery {
    cropper(): JQuery;
    cropper(options:any): JQuery;
}

interface Datepicker {
    _defaults:any;
}

interface JQueryUI {
    datepicker: any;
}


module Controller {

    export class InsertTripCtrl {

        activeItem:string = '';
        persons:number = 1;
        days:number = 1;
        accomodation:boolean = false;
        tripCity:string = '';
        tripTitle:string = '';
        tripDescription:string = '';
        tripDescriptionMoney:string = '';
        dateFormat:string = 'yy-mm-dd';

        datePicker:any;
        startDate:string = '';
        endDate:string = '';
        startDateISO:string = '';
        endDateISO:string = '';
        startDateReal:any = '';
        endDateReal:any = '';
        selectedPlaceDetails: any;

        accomodationEquipment:string[] = [];
        progressPercentage:number;
        googlePlacesOptions = {
            country: 'de',
            types: '(cities)'
        };

        showImageUploadModal:boolean = false;
        imagePath:any;
        selectedImage:any;
        imageCropData:any;
        cropperElem:any;
        imageHasBeenUploaded:boolean;
        headerImagePath:string;

        constructor(private $scope, private $rootScope, private InsertTripService, private Upload, private basePath) {
            this.$scope.selectImage = this.selectImage;
            $scope.$on('mapentrySelected', (event, details)  => {
                this.selectedPlaceDetails = details;
            });

            $rootScope.overlay = false;

            this.datePicker = $(".datepicker");

            this.datePicker.datepicker({
                dateFormat: this.dateFormat,
                minDate: 0,
                beforeShowDay: (date) => {
                    var date1 = $.datepicker.parseDate(this.dateFormat, this.startDate);
                    var date2 = $.datepicker.parseDate(this.dateFormat, this.endDate);

                    if (date1 != null && date2 != null) {
                        if (date1 > date2) {
                            var temp = date1;
                            date1 = date2;
                            date2 = temp;
                        }
                    }

                    return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
                },
                onSelect: (dateText, inst) => {
                    var date1 = $.datepicker.parseDate(this.dateFormat, this.startDate);
                    var date2 = $.datepicker.parseDate(this.dateFormat, this.endDate);

                    if (!date1 || date2) {
                        this.startDate = dateText;
                        this.endDate = "";
                        this.datePicker.datepicker();
                    } else {
                        this.endDate = dateText;
                        this.datePicker.datepicker();
                    }

                    //Compare start- and end-date
                    var tempDate1 = new Date(this.startDate);
                    //console.log(tempDate1.toISOString());
                    var tempDate2 = new Date(this.endDate);
                    if (tempDate1 > tempDate2) {
                        //swap elements
                        this.startDate = [this.endDate, this.endDate = this.startDate][0];
                    }

                    if (this.startDate != null && this.startDate != '') {
                        this.startDateISO = tempDate1.toISOString();
                    }

                    if (this.endDate != null && this.endDate != '') {
                        this.endDateISO = tempDate2.toISOString();
                    }



                    //this.endDate = tempDate2.toISOString();

                    console.log(this.startDate);
                    console.log(this.endDate);
                }
            });
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
                this.accomodationEquipment = [];
            }
        }

        showImageChooser() {
            $('#image-upload').click();
        }

        imageChoice() {
            this.cropperElem = $('#cropping-preview');
            this.cropperElem.cropper({
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
            this.InsertTripService.uploadImage(formData, file)
                .progress(evt => {
                    var perc:number = 100.0 * evt.loaded / evt.total;
                    this.progressPercentage = Math.round(perc);
                    console.log('progress:', this.progressPercentage, '% ', evt.config.file.name);
                }).success((data, status, headers, config) => {
                    console.log('file', config.file.name, 'uploaded. Response:', data);
                    this.clearFileSelection();
                    this.showNewImage(data);
                });

            //this.InsertTripService.uploadImage(formData);
        }

        clearFileSelection() {
            this.showImageUploadModal = false;
            this.$rootScope.overlay = false;
            this.selectedImage = null;
            this.imagePath = '';
            this.cropperElem.attr('src', '');
            $('.cropper-container').remove()
        }

        showNewImage(data) {
            this.imageHasBeenUploaded = true;
            this.headerImagePath = data.imageLocation.picture;
        }

        addAccomodationEquipment(service:string) {
            if (this.accomodation) {
                if (this.containsAccomodation(service)) {
                    var index = this.accomodationEquipment.indexOf(service);
                    this.accomodationEquipment.splice(index, 1);
                } else {
                    this.accomodationEquipment.push(service);
                }
            }

            console.log(this.accomodationEquipment);
        }

        containsAccomodation(service:string) {
            var found = $.inArray(service, this.accomodationEquipment);
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
            this.startDateReal = new Date(this.startDateISO);
            console.log(this.startDateISO);
            console.log(this.startDateReal);
            var city = this.getLocationDetails();
            var t = {
                city: city,
                title: this.tripTitle,
                description: this.tripDescription,
                description_money: this.tripDescriptionMoney,
                //start_date: this.startDate,
                //end_date: this.endDate,
                accomodation: this.accomodation,
                accomodation_equipment: this.accomodationEquipment,
                //moods
                //locations
                //pics
                //active
                //delete
                type: 'trip'
            };

            //store trip in DB
            this.InsertTripService.saveTrip(t).then(() => {
                console.log('party')
            })
        }


        static controllerId:string = "InsertTripCtrl";
    }
}
