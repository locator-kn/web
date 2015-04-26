module Controller {
    export class TriplerSearchCtrl {

        cities;

        constructor(private $scope, private TriplerService, private DataService) {
            this.getCities();
        }

        getCities() {
            this.DataService.getCities().then(result => {
               this.cities = result;
            });
        }

        static controllerId:string="TriplerSearchCtrl";
    }
}
