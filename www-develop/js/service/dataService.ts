module Service {
    export class DataService {
        constructor(private $http) {

        }

        getCities() {
            return this.$http.get('/data/cities');
        }

        getAccomodations() {
            return this.$http.get('/data/accomodations');
        }

        getMoods() {
            return this.$http.get('/data/moods');
        }

        static serviceId:string = "DataService";
    }
}
