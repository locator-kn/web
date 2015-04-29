module Controller {
    export class CreateTripCtrl {

        params = {
            checkin: undefined,
            checkout: undefined
        }


        constructor($scope, DataService) {
            // initial loading of todays and todays + 3 date
            this.params.checkin = DataService.getDates().checkinDate;
            this.params.checkout = DataService.getDates().checkoutDate;
        }

        static controllerId:string = "CreateTripCtrl";
    }
}
