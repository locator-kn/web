module Service {
    export class DataService {
        constructor(private $http, private basePath) {

        }

        getCities() {
            return this.$http.get(this.basePath + '/data/cities');
        }

        getAccomodations() {
            return this.$http.get(this.basePath + '/data/acc');
        }

        getMoods() {
            return this.$http.get(this.basePath + '/data/moods');
        }

        static serviceId:string = "DataService";
    }
}
