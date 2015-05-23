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
        accommodation:boolean = false;
        tripCity:string = '';
        tripTitle:string = '';
        tripDescription:string = '';
        tripDescriptionMoney:string = '';
        dateFormat:string = 'yy-mm-dd';

        datePicker:any;
        startDatePicker:string = '';
        endDatePicker:string = '';
        startDateReal:any = '';
        endDateReal:any = '';
        selectedPlaceDetails: any;

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

        constructor(private $scope, private $rootScope, private InsertTripService, private lodash) {
            this.$scope.selectImage = this.selectImage;
            $scope.$on('mapentrySelected', (event, details)  => {
                this.selectedPlaceDetails = details;
            });

            $rootScope.overlay = false;
            this.setupDatepicker();
        }


        setupDatepicker() {
            this.datePicker = $(".datepicker");

            this.datePicker.datepicker({
                dateFormat: this.dateFormat,
                minDate: 0,
                beforeShowDay: (date) => {
                    var startDate = $.datepicker.parseDate(this.dateFormat, this.startDatePicker);
                    var endDate = $.datepicker.parseDate(this.dateFormat, this.endDatePicker);

                    if (startDate != null && endDate != null) {
                        if (startDate > endDate) {
                            startDate = [endDate, endDate = startDate][0];
                        }
                    }

                    return [true, startDate && ((date.getTime() == startDate.getTime()) || (endDate && date >= startDate && date <= endDate)) ? "dp-highlight" : ""];
                },
                onSelect: (dateText, inst) => {
                    var startDate = $.datepicker.parseDate(this.dateFormat, this.startDatePicker);
                    var endDate = $.datepicker.parseDate(this.dateFormat, this.endDatePicker);

                    if (!startDate || endDate) {
                        this.startDatePicker = dateText;
                        this.endDatePicker = "";
                    } else {
                        this.endDatePicker = dateText;
                    }

                    var tempStartDate = new Date(this.startDatePicker);
                    var tempEndDate = new Date(this.endDatePicker);
                    if (tempStartDate > tempEndDate) {
                        this.startDatePicker = [this.endDatePicker, this.endDatePicker = this.startDatePicker][0];
                        tempStartDate = [tempEndDate, tempEndDate = tempStartDate][0];
                    }

                    if (this.startDatePicker != null && this.startDatePicker != '') {
                        this.startDateReal = new Date(tempStartDate.toISOString()).toISOString();
                    }

                    if (this.endDatePicker != null && this.endDatePicker != '') {
                        this.endDateReal = new Date(tempEndDate.toISOString()).toISOString();
                    }
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
            this.accommodation = !this.accommodation;

            if (!this.accommodation) {
                this.accommodationEquipment = [];
            }
        }

        showImageChooser() {
            if(!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }
            $('#image-upload').click();
        }

        imageChoice() {
            var cropperElem = $('#cropping-preview');
            cropperElem.cropper({
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
                nameOfTrip: 'scheisshaufen'
            };
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
            $('.cropper-container').remove()
        }

        showNewImage(data) {
            this.imageHasBeenUploaded = true;
            this.headerImagePath = data.imageLocation.picture;
        }

        addAccomodationEquipment(service:string) {
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
            return {
                title: this.selectedPlaceDetails.name,
                id: this.selectedPlaceDetails.id,
                place_id: this.selectedPlaceDetails.place_id
            }
        }

        saveTrip() {
            if(!this.$rootScope.authenticated) {
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
            })
        }


        static controllerId:string = "InsertTripCtrl";
    }
}
