module Controller {

    export class LocationCtrl {

        locations;


        constructor(private $scope, private $rootScope, private $state, private LocationService, private UserService, private DataService, private HelperService) {
            this.getMyLocations();
        }

        getMyLocations() {
            this.LocationService.getMyLocations()
                .then(result => {
                    this.locations = result.data;
                });
        }


        static controllerId:string = "LocationCtrl";
    }
}
