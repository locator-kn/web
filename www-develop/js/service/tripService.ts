module Service {
    export class TripService {

        constructor(private $http, private basePath, private Upload, private $rootScope, private UserService, private MessengerService, private $state) {
        }

        getTripById(_id) {
            return this.$http.get(this.basePath + '/trips/' + _id);
        }

        saveTrip(newTrip, id) {
            if (id) {
                // extend new trip with meta data id and rev
                return this.$http.put(this.basePath + '/trips/' + id, newTrip);
            }
            return this.$http.post(this.basePath + '/trips', newTrip);
        }

        uploadImage(formData, file) {

            // To be sure keys don't exist
            delete formData._id;
            delete formData._rev;
            return this.Upload.upload({
                url: this.basePath + '/trips/image',
                fields: formData,
                file: file
            });
        }

        getMyTrips() {
            return this.$http.get(this.basePath + '/users/my/trips');
        }

        getTripsByUser(userid) {
            return this.$http.get(this.basePath + '/users/' + userid + '/trips');
        }

        getHeaderImagesByTrip(trip:any, mapSize:string = '1151x675', scale:number = 2):string[] {
            var array:string[] = [];
            var locationsHash = trip.locations;

            for (var key in locationsHash) {
                if (locationsHash.hasOwnProperty(key)) {
                    var selectedObjImages = locationsHash[key];
                    if (selectedObjImages.picture) {
                        array.push(selectedObjImages.picture);
                    }
                    array.push(locationsHash[key].googlemap + '&size=' + mapSize + '&scale=' + scale);
                }
            }
            return array;
        }

        togglePublicTrip(tripId) {
            return this.$http.put(this.basePath + '/trips/' + tripId + '/togglePublic');
        }

        deleteTrip(_id) {
            return this.$http.delete(this.basePath + '/trips/' + _id);
        }

        participate(user, trip) {
            if (!this.$rootScope.authenticated) {
                return this.$rootScope.$emit('openLoginDialog');
            }

            this.UserService.getMe().then(me => {
                var participant = me.data;
                var msg = this.MessengerService.getInitMessage(user, trip, participant);
                this.MessengerService.startConversation(msg, user._id, trip._id || trip.id).then((result:any) => {
                    var conId = result.data.id;
                    this.$state.go('messenger.opponent', {opponentId: conId});
                    this.$rootScope.$broadcast('new_conversation');
                });
            });
        }



        static
            serviceId:string = "TripService";
    }
}
