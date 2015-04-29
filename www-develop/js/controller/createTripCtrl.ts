module Controller {
    export class CreateTripCtrl {

        params = {
            checkin: undefined,
            checkout: undefined
        }


        constructor($scope, private DataService, private ngDialog) {
            // initial loading of todays and todays + 3 date
            this.params.checkin = DataService.getDates().checkinDate;
            this.params.checkout = DataService.getDates().checkoutDate;
        }

        open() {
            this.ngDialog.open({template: './templates/modal/locations.html'});
            console.info("yo");
        }


        static controllerId:string = "CreateTripCtrl";
    }
}
