module Service {
    export class TripService {

        constructor(private $http, private basePath, private Upload) {
        }

        getTripById(_id) {
            return this.$http.get(this.basePath + '/trips/' + _id);
        }

        saveTrip(newTrip, documentMetaData) {
            if (documentMetaData._id) {
                // extend new trip with meta data id and rev
                return this.$http.put(this.basePath + '/trips/' + documentMetaData._id, newTrip);
            }
            // To be sure keys don't exist
            delete documentMetaData._id;
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

        static
            serviceId:string = "TripService";
    }
}
