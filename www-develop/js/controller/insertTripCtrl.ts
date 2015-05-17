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

        constructor(private $scope) {

        }

        isActive(item) {
            return item == this.activeItem;
        }

        toggleAccomodation() {
            this.accomodation = !this.accomodation;
        }

        imageChoice() {
            $('#image-upload').click();
        }

        addAccomodationService(service:string) {
            //var found = $.inArray(service, this.accomodationServices);
            if (this.containsAccomodation(service)) {
                var index = this.accomodationServices.indexOf(service);
                this.accomodationServices.splice(index, 1);
            } else {
                this.accomodationServices.push(service);
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
