module Service {
    export class SearchService {

        citiesWithTrips = [];

        constructor(private $http, private $location, private basePath, private DataService, private lodash, private $q) {

        }

        getAllTrips() {
            return this.$http.get(this.basePath + '/api/v1/trips');
        }

        getTripsByQuery(searchQuery) {
            // create a copy by value
            var sq = this.lodash.cloneDeep(searchQuery);

            var query = this.basePath + '/api/v1/trips/search';
            return this.getCityId(sq.city).then(cityid => {
                // delete city from query since it is part of the path
                delete sq.city;

                // returning a promise inside a promise will make the outside promise resolving if inside is resolved.
                return this.$http({
                    url: query + '/' + cityid,
                    params: sq,
                    method: 'GET'
                });
            });
        }

        getCityId(city) {
            var promise = this.$q((resolve, reject) => {
                this.DataService.getAvailableCities()
                    .then(result => {
                        this.citiesWithTrips = result.data;
                        var cityObject = this.lodash.findWhere(this.citiesWithTrips, {title: city});
                        if(cityObject.place_id) {
                            return resolve(cityObject.id);
                        }
                        reject({msg: 'not found'});
                    });

            });

            return promise;
        }

        getTripById(tripId) {
            return this.$http.get(this.basePath + '/api/v1/trips/'+tripId);
        }


        static serviceId:string = "SearchService";
    }
}
