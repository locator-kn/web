module Controller {

    export class LocationViewCtrl {

        locationId:any;
        location:any;

        constructor(private $scope, private $stateParams, private LocationService) {
            this.locationId = $stateParams.locationId;

            this.LocationService.getLocationById(this.locationId)
                .then(result => {
                    this.location = result.data;
                    console.log(this.location);
            });
        }

        static controllerId:string = "LocationViewCtrl";
    }
}
