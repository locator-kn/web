module Service {
    export class SearchService {
        constructor(private $http) {

        }


        getAllTrips() {
            return this.$http.get('http://locator.in.htwg-konstanz.de:3001/api/v1/trips');
        }

        getTripsByQuery(searchQuery) {
            var city = searchQuery.city;
            //delete searchQuery.city;
            var s = {

            };
            return this.$http({
                url: 'http://locator.in.htwg-konstanz.de/api/v1/trips/search/' + city,
                method: "GET"
            })
        }


        static serviceId:string = "SearchService";
    }
}
