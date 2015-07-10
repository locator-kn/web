module Service {
    export class SearchService {

        citiesWithTrips = [];
        searchQuery:any;
        pageSize:number = 10;

        allTripsCache:any;
        searchCache:any;


        static $inject = ['$http', 'basePath', 'DataService', 'lodash', '$q', 'UserService', 'HelperService', 'CacheFactory'];
        constructor(private $http, private basePath, private DataService,
                    private lodash, private $q, private UserService, private HelperService, private CacheFactory) {
            this.allTripsCache = this.CacheFactory.createCache('allTrips', {
                maxAge: 120000 // 2 min
            });
            this.searchCache = this.CacheFactory.createCache('searchTrips', {
                maxAge: 120000 // 2 min
            });

        }

        getAllTrips() {
            return this.$http.get(this.basePath + '/trips', {cache: this.allTripsCache});
        }

        getTripsByQuery(searchQuery) {
            // create a copy by value
            var sq = this.lodash.cloneDeep(searchQuery);
            // clone query
            this.searchQuery = this.lodash.cloneDeep(searchQuery);
            sq.page_size = this.pageSize;
            sq.page = 1;
            return this.getTrips(sq);
        }

        getMoreTrips(pageCount) {
            // create a copy by value
            var sq = this.lodash.cloneDeep(this.searchQuery);
            sq.page_size = this.pageSize;
            sq.page = pageCount;
            return this.getTrips(sq);
        }

        getTrips(sq) {
            var query = this.basePath + '/trips/search';
            return this.getCityId(sq.city).then(cityid => {
                // delete city from query since it is part of the path
                delete sq.city;
                // returning a promise inside a promise will make the outside promise resolving if inside is resolved.
                return this.$http({
                    url: query + '/' + cityid,
                    params: sq,
                    method: 'GET'
                }, {cache: this.searchCache}).success(data => {
                    data.forEach((entry:any) => {
                        this.UserService.getUser(entry.userid).then(result => {
                            entry.username = result.data.name + ' ' + result.data.surname;
                        });
                        this.HelperService.getMoodByQueryName(entry.moods[0]).then(result => {
                            entry.mood = result;
                        });
                    });
                    return data;
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
