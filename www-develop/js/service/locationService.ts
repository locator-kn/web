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

        static serviceId:string = "LocationService";
    }
}
