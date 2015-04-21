module Controller {
    export class TriplerSearchCtrl {

        cities;

        constructor(private $scope, private TriplerService) {
            this.getCities();
        }

        getCities() {
            this.TriplerService.cities().then(result => {
               this.cities = result;
            });
        }

        static controllerId:string="TriplerSearchCtrl";
    }
}
