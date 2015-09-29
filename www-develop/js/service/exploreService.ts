module Service {
    export class ExploreService {

        static $inject = ['$http', 'basePath'];

        constructor(private $http, private basePath) {
        }

        searchLocations(cityId, category) {
            var queryString = '/locations/search/' + cityId;
            if(category) {
                queryString += '/' + category
            }
            return this.$http.get(this.basePath + queryString);
        }

        static serviceId:string = "ExploreService";
    }
}

