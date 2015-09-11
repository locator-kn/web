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

        relatedLocations: any = [];


        static $inject = ['$scope', '$stateParams', 'LocationService', 'UserService', '$state', '$rootScope', 'MessengerService', 'lodash', 'KeenService'];
        constructor(private $scope, private $stateParams, private LocationService, private UserService, private $state, private $rootScope, private MessengerService, private lodash, private KeenService) {
            this.locationId = $stateParams.locationId;

            this.LocationService.getRelatedLocationsByLocationId(this.locationId, 3)
            .then((result:any) => {
                    result.data.forEach((item:any) => {
                        item.city.title = item.city.title.split(',')[0];
                        this.UserService.getUser(item.userid).then(result => {
                            item.user = result.data;
                        });
                    });
                    this.relatedLocations = result.data;

                });

            this.LocationService.getLocationById(this.locationId)
                .then(result => {
                    this.location = result.data;
                    this.$rootScope.breadcrumb = 'Locationdetail | ' + this.location.title;

                    this.KeenService.add('pv', 'location', result.data);

                    this.locationImagePath = this.location.images.picture;

                    if (this.locationImagePath === undefined) {
                        this.locationImagePath = this.location.images.googlemap + '&size=1400x819&scale=2';
                    } else {
                        this.locationImagePath = this.locationImagePath + '?size=max'
                    }

                    this.$scope.$emit('updateTitle', this.location.title + ' | ' + this.location.city.title);

                    this.$scope.$emit('updateOgElements', {
                        title: this.location.title + ' | ' + this.location.city.title,
                        description: this.location.description,
                        url: window.location.href,
                        image: this.locationImagePath
                    });


                    this.userId = this.location.userid;
                    this.UserService.getUser(this.userId)
                        .then(resultUser => {
                            this.user = resultUser.data;
                            this.me = this.$rootScope.userID === this.userId;
                            if (!this.user.picture) {
                                this.profileImagePath = '/images/profile.svg';
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
