module Service {
    export class SearchService {
        constructor(private $http) {

        }


        getAllTrips() {
            return this.$http.get('http://locator.in.htwg-konstanz.de:3001/api/v1/trips');
        }


        static serviceId:string = "SearchService";
    }
}
