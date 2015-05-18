module Service {
    export class InsertTripService {

        constructor(private $http, private basePath, private Upload) {
        }

        saveTrip(newTrip) {
            return this.$http.post(this.basePath + '/trips', newTrip)
        }
        uploadImage(imageData) {
            return this.$http.post(this.basePath + '/trips/image', {
                data: imageData,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        }
        static serviceId:string = "InsertTripService";
    }
}
