module Service {
    export class ExploreService {

        static $inject = ['$http'];
        constructor(private $http) {

        }

        static serviceId:string = "ExploreService";
    }
}

