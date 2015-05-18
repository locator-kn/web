module Service {
    export class InsertTripService {

        constructor(private $http, private basePath) {
        }

        saveTrip(newTrip) {
            return this.$http.post(this.basePath + '/trips', newTrip)
        }
        static serviceId:string = "InsertTripService";
    }
}
