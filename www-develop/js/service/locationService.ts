module Service {
    export class LocationService {

        constructor(private $http, private basePath, private Upload) {
        }

        uploadImage(formData, file) {

            // To be sure keys don't exist
            delete formData._id;
            delete formData._rev;
            return this.Upload.upload({
                url: this.basePath + '/users/my/locations/picture',
                fields: formData,
                file: file
            });
        }

        saveLocation(location, id?:string) {
            if(id) {
                return this.$http.put(this.basePath + '/users/my/locations/' + id, location);
            }
            return this.$http.post(this.basePath + '/users/my/locations', location)
        }

        getMyLocations() {
            return this.$http.get(this.basePath + '/users/my/locations');
        }

        getLocationsByUser(userID) {
            return this.$http.get(this.basePath + '/users/' + userID + '/locations');
        }

        getLocationById(locationId) {
            return this.$http.get(this.basePath + '/locations/' + locationId);
        }

        togglePublicLocation(locationId) {
            return this.$http.put(this.basePath + '/locations/' + locationId + '/togglePublic');
        }

        deleteLocation(locationId) {
            return this.$http.delete(this.basePath + '/users/my/locations/' + locationId);
        }

        static serviceId:string = "LocationService";
    }
}
