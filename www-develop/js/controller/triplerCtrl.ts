module Controller {
    export class TriplerCtrl {

        cities;

        constructor(private $scope, private TriplerService) {
            this.getCities();
        }

        getCities() {
            this.TriplerService.cities().then(result => {
               this.cities = result;
            });
        }

        static controllerId:string="TriplerCtrl";
    }
}
