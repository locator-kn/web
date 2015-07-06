module Controller {

    export class LocationViewCtrl {

        locationId:any;
        location:any;
        locationImagePath:any;
        userId:any;
        user:any;
        profileImagePath:any;
        me:boolean = false;
        conversationId:any;

        constructor(private $scope, private $stateParams, private LocationService, private UserService, private $state, private $rootScope, private MessengerService, private lodash) {
            this.locationId = $stateParams.locationId;


            this.LocationService.getLocationById(this.locationId)
                .then(result => {
                    this.location = result.data;
                    this.$rootScope.breadcrumb = 'Locationdetail | ' + this.location.title;

                    this.locationImagePath = this.location.images.picture;
                    console.log(this.locationImagePath);

                    if (this.locationImagePath === undefined) {
                        this.locationImagePath = this.location.images.googlemap + '&size=1400x819&scale=2';
                    } else {
                        this.locationImagePath = this.locationImagePath + '&size=mid'
                    }

                    this.userId = this.location.userid;
                    this.UserService.getUser(this.userId)
                    .then(resultUser => {
                            this.user = resultUser.data;
                            this.me = this.$rootScope.userID === this.userId;
                            if (!this.user.picture) {
                                this.profileImagePath = '/images/profile.png?size=user';
                            } else {
                                this.profileImagePath = this.user.picture + '?size=user';
                            }
                        });

                    this.MessengerService.getConversations()
                        .then(result => {
                            var conversation = this.lodash.findWhere(result.data, {
                                'opponent': this.userId
                            });
                            if (!conversation) {
                                return;
                            }
                            this.conversationId = conversation._id || conversation.id || '';
                        });
            });
        }

        moveToAllLocations() {
            this.$state.go('user', {
                profileId: this.userId,
                tab: 'locations'
            })
        }

        moveToMessenger() {
            if (this.conversationId) {
                this.$state.go('messenger.opponent', {
                    opponentId: this.conversationId
                });
            } else {
                this.$state.go('user', {
                    profileId: this.userId,
                    tab: 'conversation'
                })
            }
        }

        moveToEditTrip() {
            this.$state.go('editLocation', {
                locationId: this.locationId
            })
        }

        static controllerId:string = "LocationViewCtrl";
    }
}
