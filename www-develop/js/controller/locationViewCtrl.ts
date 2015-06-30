module Controller {

    export class LocationViewCtrl {

        locationId:any;
        location:any;
        locationImagePath:any;
        userId:any;
        user:any;
        profileImagePath:any;

        constructor(private $scope, private $stateParams, private LocationService, private UserService) {
            this.locationId = $stateParams.locationId;

            this.LocationService.getLocationById(this.locationId)
                .then(result => {
                    this.location = result.data;
                    this.locationImagePath = this.location.images.picture;
                    this.userId = this.location.userid;
                    console.log(this.location);
            });

            this.UserService.getUser(this.userId)
                .then(result => {
                    this.user = result.data;
                    if (!this.user.picture) {
                        this.profileImagePath = "/images/profile.jpg"
                    } else {
                        this.profileImagePath = this.user.picture.picture;
                    }
                });
        }

        static controllerId:string = "LocationViewCtrl";
    }
}
