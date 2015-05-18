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

        constructor(private $scope, private $rootScope, private InsertTripService) {
            $scope.$on('mapentrySelected', (event, details)  => {
                this.selectedPlaceDetails = details;
            });
            $rootScope.overlay = true;
        }

        isActive(item) {
            return item == this.activeItem;
        }

        toggleAccomodation() {
            this.accomodation = !this.accomodation;

            if (!this.accomodation) {
                this.accomodationServices = [];
            }
        }

        imageChoice() {
            $('#image-upload').click();
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
