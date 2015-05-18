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
        accomodationServices:string[] = [];
        googlePlacesOptions = {
            country: 'de',
            types: '(cities)'
        };

        imagePath: any;
        selectedImage:string = '';

        constructor(private $scope, private $rootScope) {
            this.$scope.selectImage = this.selectImage;
        }

        isActive(item) {
            return item == this.activeItem;
        }

        addImage() {
            this.$rootScope.overlay = true;
            this.imageChoice();
        }

        selectImage(file) {
            if (file.files && file.files[0]) {
                var reader = new FileReader();
                var image = new Image();

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
            $('.trip-image > img').cropper({
                aspectRatio: 1,
                crop: (data) => {
                    console.log(data)
                }
            });
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

        saveTrip() {
            //store trip in DB
        }


        static controllerId:string="InsertTripCtrl";
    }
}
