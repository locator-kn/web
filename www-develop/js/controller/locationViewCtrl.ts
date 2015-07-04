module Controller {

    export class LocationViewCtrl {

        locationId:any;
        location:any;
        locationImagePath:any;
        userId:any;
        user:any;
        profileImagePath:any;
        me:boolean = false;

        constructor(private $scope, private $stateParams, private LocationService, private UserService, private $state, private $rootScope) {
            this.locationId = $stateParams.locationId;

            this.LocationService.getLocationById(this.locationId)
                .then(result => {
                    this.location = result.data;
                    this.locationImagePath = this.location.images.picture;
                    this.userId = this.location.userid;
                    console.log(this.location);
                    this.UserService.getUser(this.userId)
                    .then(resultUser => {
                            this.user = resultUser.data;
                            this.me = this.$rootScope.userID === this.userId;
                            if (!this.user.picture) {
                                this.profileImagePath = "/images/profile.png"
                            } else {
                                this.profileImagePath = this.user.picture.picture;
                            }
                        })
            });
        }

        moveToAllLocations() {
            this.$state.go('user', {
                profileId: this.userId,
                tab: 'locations'
            })
        }

        moveToMessenger() {
            if (!this.me) {
                this.$state.go('user', {
                    profileId: this.userId,
                    tab: 'conversation'
                })
            }
        }

        static controllerId:string = "LocationViewCtrl";
    }
}
