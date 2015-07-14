declare var google;

module Service {
    export class LocationService {

        static $inject = ['$q', '$http', 'basePath', 'Upload'];

        constructor(private $q, private $http, private basePath, private Upload) {
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

        deleteLocationForce(locationId) {
            return this.$http.delete(this.basePath + '/users/my/locations/' + locationId + '/force');
        }

        getLocationsByCity(city:string) {
            return this.$http.get(this.basePath + '/locations/city/' + city);
        }

        getMyLocationsByCity(city:string) {
            return this.$http.get(this.basePath + '/users/my/locations/city/' + city);
        }

        getCityByCoords(lat, lon) {

            return this.$q((resolve, reject) => {

                var latlng = new google.maps.LatLng(lat, lon);
                var geocoder = new google.maps.Geocoder();

                var geocoderRequestObject = {
                    location: latlng
                };

                geocoder.geocode(geocoderRequestObject, (result, status) => {

                    if (!status === google.maps.GeocoderStatus.OK) {
                        return reject();
                    }

                    return resolve(result);
                });

            });


            //return this.$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=true');
        }

        getPlaceIdByAddress(address:string) {

            return this.$q((resolve, reject) => {

                var geocoder = new google.maps.Geocoder();

                var geocoderRequestObject = {
                    address: address
                };

                geocoder.geocode(geocoderRequestObject, (result, status) => {

                    if (!status === google.maps.GeocoderStatus.OK) {
                        return reject();
                    }

                    return resolve(result);
                });

            });


            //return this.$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=true');
        }


        static serviceId:string = "LocationService";
    }
}
