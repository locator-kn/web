module Controller {

    export class LocationViewCtrl {

        locationId:any;
        location:any;

        constructor(private $scope, private $stateParams, private LocationServce) {
            this.locationId = $stateParams.locationId;

            this.LocationServce.getLocationById(this.locationId)
                .then(result => {
                    this.location = result.data;
                    console.log(this.location);
            });
        }

        static controllerId:string = "LocationViewCtrl";
    }
}
