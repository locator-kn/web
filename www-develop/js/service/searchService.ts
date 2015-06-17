module Service {
    export class SearchService {

        citiesWithTrips = [];
        searchQuery:any;

        constructor(private $http, private $location, private basePath, private DataService, private lodash, private $q) {

        }

        getAllTrips() {
            return this.$http.get(this.basePath + '/api/v1/trips');
        }

        getTripsByQuery(searchQuery) {
            // create a copy by value
            var sq = this.lodash.cloneDeep(searchQuery);
            this.searchQuery  = sq;
            sq.page_size = 6;
            sq.page = 1;
            var query = this.basePath + '/trips/search';
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

        getMoreTrips(pageCount) {
            // create a copy by value
            var sq = this.lodash.cloneDeep(this.searchQuery);
            sq.page_size = 6;
            sq.page = pageCount;
            var query = this.basePath + '/trips/search';
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
            return this.$http.get(this.basePath + '/trips/'+tripId);
        }


        static serviceId:string = "SearchService";
    }
}
