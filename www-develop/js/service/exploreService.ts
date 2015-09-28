module Service {
    export class ExploreService {

        static $inject = ['$http', 'basePath'];

        constructor(private $http, private basePath) {
        }

        searchLocations(cityId, category) {
            return this.$http.get(this.basePath + '/locations/search/' + cityId + '/' + category);
        }

        static serviceId:string = "ExploreService";
    }
}

