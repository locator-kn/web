
module Service {
    export class MessengerService {

        citiesWithTrips = [];

        constructor(private $http) {

        }


        static serviceId:string = "MessengerService";
    }
}
