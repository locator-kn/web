module Service {
    export class LocationService {

        locationsCache:any;
        locationsUserIdCache:any;
        locationsCityCache:any;
        locationsMyCityCache:any;


        static $inject = ['$http', 'basePath', 'Upload', 'CacheFactory'];

        constructor(private $http, private basePath, private Upload, private CacheFactory) {
            this.locationsCache = CacheFactory.createCache('locations', {
                maxAge: 120000 // 2 min
            });

            this.locationsUserIdCache = CacheFactory.createCache('locationsUserId', {
                maxAge: 120000 // 2 min
            });

            this.locationsCityCache = CacheFactory.createCache('locationsCity', {
                maxAge: 120000 // 2 min
            });

            this.locationsMyCityCache = CacheFactory.createCache('locationsMyCity', {
                maxAge: 120000 // 2 min
            });
        }

        uploadImage(formData, file) {

            var id = formData._id;
            delete formData._id;
            delete formData._rev;

            if (!id) {
                return this.Upload.upload({
                    url: this.basePath + '/users/my/locations/picture',
                    fields: formData,
                    file: file
                });
            } else {
                return this.Upload.upload({

                    url: this.basePath + '/locations/' + id + '/picture',
                    fields: formData,
                    file: file
                });
            }

        }

        saveLocation(location, id?:string) {
            if (id) {
                return this.$http.put(this.basePath + '/users/my/locations/' + id, location);
            }
            return this.$http.post(this.basePath + '/users/my/locations', location)
        }

        getMyLocations() {
            return this.$http.get(this.basePath + '/users/my/locations', {cache: this.locationsCache});
        }

        getLocationsByUser(userID) {
            return this.$http.get(this.basePath + '/users/' + userID + '/locations', {cache: this.locationsUserIdCache});
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

        deleteLocationForce(locationId) {
            return this.$http.delete(this.basePath + '/users/my/locations/' + locationId + '/force');
        }

        getLocationsByCity(city:string) {
            return this.$http.get(this.basePath + '/locations/city/' + city, {cache: this.locationsUserIdCache});
        }

        getMyLocationsByCity(city:string) {
            return this.$http.get(this.basePath + '/users/my/locations/city/' + city, {cache: this.locationsMyCityCache});
        }

        getCityByCoords(lat, lon) {
            return this.$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=true');
        }


        static serviceId:string = "LocationService";
    }
}
