module Controller {

    export class LocationViewCtrl {

        locationId:any;
        location:any;
        locationImagePath:any;

        constructor(private $scope, private $stateParams, private LocationService) {
            this.locationId = $stateParams.locationId;

            this.LocationService.getLocationById(this.locationId)
                .then(result => {
                    this.location = result.data;
                    this.locationImagePath = this.location.images.picture;
                    console.log(this.location);
                    console.log(this.locationImagePath);
            });
        }

        static controllerId:string = "LocationViewCtrl";
    }
}
