module Controller {


    export class TripCtrl {

        trip:any = {};

        constructor(private $scope, private $stateParams, private SearchService) {
            this.SearchService.getTripById(this.$stateParams.tripId)
                .then(result => {
                    this.trip = result.data[0];
                });
        }

        static controllerId:string = "TripCtrl";
    }
}
