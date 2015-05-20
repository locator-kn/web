module Service {
    export class SearchService {

        citiesWithTrips = [];

        constructor(private $http, private basePath, private DataService) {

        }

        getAllTrips() {
            return this.$http.get('http://locator.in.htwg-konstanz.de:3001/api/v1/trips');
        }

        getTripsByQuery(searchQuery) {
            var cityId = this.getCityId(searchQuery.city);
            //delete searchQuery.city;
            return this.$http({
                url: 'http://locator.in.htwg-konstanz.de/api/v1/trips/search/' + cityId,
                method: "GET"
            })
        }

        getCityId(city) {
            var id;

            this.DataService.getAvailableCities()
                .then(result => {
                    this.citiesWithTrips = result.data;
                });

            this.citiesWithTrips.forEach(function(entry) {
                if(city == entry.title) {
                    id = entry.id;
                }
            });
            return id;
        }


        static serviceId:string = "SearchService";
    }
}
