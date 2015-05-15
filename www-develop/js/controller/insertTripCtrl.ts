module Controller {
    export class InsertTripCtrl {

        activeItem:string = '';
        persons:number = 1;
        days:number = 1;
        accomodation:boolean = false;
        tripTitle:string = '';
        tripDescription:string = '';
        tripMoney:string = '';

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

        saveTrip() {
            //store trip in DB
        }


        static controllerId:string="InsertTripCtrl";
    }
}
