module Controller {


    export class TripCtrl {

        trip:any = {};
        start_date;
        constructor(private $rootScope, private $stateParams, private SearchService) {
            this.$rootScope.showSearchButton = true;
            this.$rootScope.showCreateButton = true;

            this.SearchService.getTripById(this.$stateParams.tripId)
                .then(result => {
                    this.trip = result.data[0];
                    this.trip.start_date = moment(new Date(this.trip.start_date)).format('L');
                    this.trip.end_date = moment(new Date(this.trip.end_date)).format('L');
                });
        }

        static controllerId:string = "TripCtrl";
    }
}
