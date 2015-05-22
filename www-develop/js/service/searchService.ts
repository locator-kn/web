module Service {
    export class SearchService {

        citiesWithTrips = [];

        constructor(private $http, private $location, private basePath, private DataService) {

        }

        getAllTrips() {
            return this.$http.get('http://locator.in.htwg-konstanz.de:3001/api/v1/trips');
        }

        getTripsByQuery(searchQuery) {

            //delete searchQuery.city;
            var query = 'http://locator.in.htwg-konstanz.de/api/v1/trips';
            query += this.getQueryParamString(searchQuery);
            console.info(query);
            return this.$http({
                url: query,
                method: "GET"
            })
        }

        getQueryParamString(searchQuery) {
            var cityId = this.getCityId(searchQuery.city);
            var queryString = this.$location.url();
            queryString = queryString.replace('?city='+searchQuery.city, '/'+ cityId);
            queryString = queryString.replace('&moods=','.');
            queryString = queryString.replace('&', '?');
            return queryString;
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
