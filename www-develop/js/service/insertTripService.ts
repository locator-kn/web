module Service {
    export class InsertTripService {

        constructor(private $http, private basePath, private Upload) {
        }

        saveTrip(newTrip) {
            return this.$http.post(this.basePath + '/trips', newTrip)
        }
        uploadImage(formData, file) {
            return this.Upload.upload({
                url: this.basePath + '/trips/image',
                fields: formData,
                file: file
            });
        }
        static serviceId:string = "InsertTripService";
    }
}
