module Service {
    export class TriplerService {
        constructor(private $http) {

        }


        filteredQue() {
            return this.$http.get('/trips/search');
        }

        getTrip(_id) {
            return this.$http.get('/trip/' + _id);
        }


        static serviceId:string = "TriplerService";
    }
}
