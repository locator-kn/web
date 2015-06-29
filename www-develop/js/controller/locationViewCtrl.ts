module Controller {

    export class LocationViewCtrl {

        locationId:any;

        constructor(private $scope, private $stateParams) {
            this.locationId = $stateParams.locationId;
            console.log(this.locationId);
        }

        static controllerId:string = "LocationViewCtrl";
    }
}
